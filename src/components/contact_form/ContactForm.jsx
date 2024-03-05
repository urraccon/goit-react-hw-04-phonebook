import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';
import { Component } from 'react';
import { Button } from 'components/common/button/Button';
import { Input } from 'components/common/input/Input';

export class ContactForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  state = {
    name: '',
    number: '',
  };

  handleChange = evt => {
    const { value, name } = evt.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={styles.contactForm} onSubmit={this.handleSubmit}>
        <Input
          labelName="Name"
          onChange={this.handleChange}
          inputName="name"
          value={name}
          pattern="^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces.
          For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <Input
          labelName="Number"
          onChange={this.handleChange}
          type="tel"
          inputName="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, 
        parentheses and can start with +"
          required
        />
        <Button type="submit">Add contact</Button>
      </form>
    );
  }
}
