import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';
import { Button } from 'components/common/button/Button';
import { Input } from 'components/common/input/Input';
import { useState } from 'react';

const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = evt => {
    const { value, name } = evt.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        console.log('Option unavailable');
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const contact = {
      name,
      number,
    };
    onSubmit(contact);
    setName('');
    setNumber('');
  };

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <Input
        labelName="Name"
        onChange={handleChange}
        inputName="name"
        value={name}
        pattern="^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces.
          For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <Input
        labelName="Number"
        onChange={handleChange}
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
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default ContactForm;
