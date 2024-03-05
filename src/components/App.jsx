import { Component } from 'react';
import styles from './App.module.css';
import { nanoid } from 'nanoid';
import { ContactForm } from './contact_form/ContactForm';
import { Filter } from './filter/Filter';
import { ContactList } from './contact_list/ContactList';
import { Section } from './common/section/Section';

const CONTACTS_KEY = 'contacts';

export class App extends Component {
  state = {
    // contacts: [],
    contacts: [],
    // contactsCopy: [],
    contactsCopy: [],
    filter: '',
  };

  async componentDidMount() {
    const data = localStorage.getItem(CONTACTS_KEY);
    // console.log(JSON.parse(data));
    try {
      if (data) {
        this.setState({
          contacts: JSON.parse(data),
          contactsCopy: JSON.parse(data),
        });
      }
    } catch (err) {
      console.log(`error: ${err}`);
    }
  }

  componentDidUpdate(_prevProps, prevState) {
    // console.log('updating component');
    if (prevState?.contacts.length !== this.state.contacts.length) {
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(this.state.contacts));
    }
  }

  addContact = form => {
    // debugger;
    console.log(form);
    const { name, number } = form;
    // const { value, name } = evt.target.form[0];
    // console.log(value);
    const { contacts } = this.state;
    // let isAlreadyAdded = false;
    if (contacts.length > 0) {
      const contactsName = contacts.map(contact => contact.name);
      // console.log(contactsName);
      const isAlreadyAdded = contactsName.includes(name);
      // console.log(isAlreadyAdded);
      if (isAlreadyAdded) {
        window.alert(`${name} is already in contacts.`);
        return;
      }
    }
    // contacts.forEach(contact => {
    //   if (contact.name.toLowerCase() === name.toLowerCase()) {
    //     window.alert(`${contact.name} is already in contacts.`);
    //     checkName = true;
    //   }
    // });
    // if (isAlreadyAdded !== undefined)
    if (name !== '' && number !== '') {
      const newId = nanoid();
      const contact = {
        id: newId,
        name: name,
        number: number,
      };
      this.setState(prev => {
        return {
          contacts: [...prev.contacts, contact],
          contactsCopy: [...prev.contacts, contact],
        };
      });
      // console.log(this.state.name);
    }
  };

  setFilter = evt => {
    // debugger;
    const { value } = evt.target;
    this.setState(prev => {
      return {
        contacts: prev.contactsCopy.filter(contact =>
          contact.name.toLowerCase().includes(value.toLowerCase())
        ),
        filter: value,
      };
    });
  };

  deleteContact = evt => {
    console.log(evt);
    const { id } = evt.target.parentNode.parentNode;
    console.log(id);
    // const {contacts} = this.state;
    this.setState(prev => {
      return {
        contacts: prev.contacts.filter(contact => contact.id !== id),
        contactsCopy: prev.contactsCopy.filter(contact => contact.id !== id),
      };
    });
  };

  render() {
    const { contacts, filter } = this.state;
    // console.log(contacts, filter);
    return (
      <div className={styles.container}>
        <div className={styles.contactBook}>
          <Section title="Phonebook">
            <ContactForm onSubmit={this.addContact} />
          </Section>
          <Section title="Contacts">
            <div className={styles.contacts}>
              <Filter filter={filter} onChange={this.setFilter} />
              <ContactList contacts={contacts} onClick={this.deleteContact} />
            </div>
          </Section>
        </div>
      </div>
    );
  }
}

// data

// { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
