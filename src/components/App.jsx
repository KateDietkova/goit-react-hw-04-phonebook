import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import { Box } from './Box/Box';

const CONTACTS = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem(CONTACTS) ?? [])
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    let isName = false;
    contacts.forEach(({ name }) => {
      if (contact.name.toLowerCase() === name.toLowerCase()) {
        alert(`${contact.name} is already in contacts`);
        isName = true;
      }
    });
    if (!isName) {
      contact.id = nanoid();
      setContacts(prevContacts => [contact, ...prevContacts]);
    }
  };

  const visibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const filterContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
    return filterContacts;
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(({ id }) => id !== contactId)
    );
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" pt="20px">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        p="10px"
        mb="20px"
      >
        <h1>Phonebook</h1>
        <ContactForm addContact={addContact} />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" p="10px">
        <h2>Contacts</h2>
        <Filter
          onSearch={(e) => setFilter(e.currentTarget.value)}
          value={filter}
        />
        {contacts.length > 0 && (
          <ContactList
            contacts={visibleContacts()}
            onDeleteContact={deleteContact}
          />
        )}
      </Box>
    </Box>
  );
};
