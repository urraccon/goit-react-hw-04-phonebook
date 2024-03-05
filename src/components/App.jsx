import styles from './App.module.css';
import { nanoid } from 'nanoid';
import ContactForm from './contact_form/ContactForm';
import { Filter } from './filter/Filter';
import { ContactList } from './contact_list/ContactList';
import { Section } from './common/section/Section';
import { useEffect, useState } from 'react';

const CONTACTS_KEY = 'contacts';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [contactsCopy, setContactsCopy] = useState([]);
  const [filter, setFilter] = useState('');
  const [isFirstMouting, setIsFirstMouting] = useState(false);

  useEffect(() => {
    if (isFirstMouting) {
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
    } else {
      setIsFirstMouting(true);
    }
  }, [contacts, isFirstMouting]);

  useEffect(() => {
    async function getContacts() {
      const data = localStorage.getItem(CONTACTS_KEY);

      if (data) {
        setContacts(JSON.parse(data));
        setContactsCopy(JSON.parse(data));
      }
    }
    getContacts().catch(err => {
      console.log(`error: ${err}`);
    });
  }, []);

  const addContact = form => {
    // debugger;
    // console.log(form);
    const { name, number } = form;

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

    if (name !== '' && number !== '') {
      const newId = nanoid();
      const contact = {
        id: newId,
        name,
        number,
      };
      setContacts(prev => [...prev, contact]);
      setContactsCopy(prev => [...prev, contact]);
      // console.log(this.state.name);
    }
  };

  const filterContacts = evt => {
    // debugger;
    const { value } = evt.target;
    setContacts(
      contactsCopy.filter(contact =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilter(value);
  };

  const deleteContact = evt => {
    // console.log(evt);
    const { id } = evt.target.parentNode.parentNode;
    // console.log(id);
    // const {contacts} = this.state;
    setContacts(prev => prev.filter(contact => contact.id !== id));
    setContactsCopy(prev => prev.filter(contact => contact.id !== id));
  };

  // console.log(contacts, filter);
  return (
    <div className={styles.container}>
      <div className={styles.contactBook}>
        <Section title="Phonebook">
          <ContactForm onSubmit={addContact} />
        </Section>
        <Section title="Contacts">
          <div className={styles.contacts}>
            <Filter filter={filter} onChange={filterContacts} />
            <ContactList contacts={contacts} onClick={deleteContact} />
          </div>
        </Section>
      </div>
    </div>
  );
};

export default App;

// data

// { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
