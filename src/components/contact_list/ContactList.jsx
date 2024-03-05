import PropTypes from 'prop-types';
import styles from './ContactList.module.css';
import { Button } from 'components/common/button/Button';

export const ContactList = ({ contacts, onClick }) => {
  return (
    <ul className={styles.contactList}>
      {contacts.map(contact => {
        return (
          <li key={contact.id} id={contact.id} className={styles.contact}>
            <div className={styles.container}>
              <span className={styles.name}>
                {`${contact.name}: `}
                <span className={styles.number}>{contact.number}</span>
              </span>
              <Button onClick={onClick}>Delete</Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array,
  onClick: PropTypes.func,
};
