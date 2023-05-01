import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Section } from './Section';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
import { ContactForm } from './ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts, removeContacts } from 'redux/contactsSlice';

export function App() {
  const filterValue = useSelector(state => state.filter.value);
  const contacts = useSelector(state => state.contacts.contact);
  const dispatch = useDispatch();

  console.log(contacts);
  // useEffect(() => {
  //   const contactsStorage = JSON.parse(localStorage.getItem('contacts'));
  //   if (contactsStorage) {
  //     console.log(contactsStorage)
  //     dispatch(addContacts(contactsStorage));
  //   }
  // }, [dispatch]);

  const contactsSubmit = e => {
    console.log(e);
    const id = nanoid();
    const name = e.name;
    const number = e.number;
    const contactsLists = [...contacts];
    console.log(contactsLists);

    if (
      contactsLists.findIndex(
        contact =>
          name.toLowerCase().replace(/ /g, '') ===
          contact.name.toLowerCase().replace(/ /g, '')
      ) !== -1
    ) {
      alert(`${name} is already in contacts.`);
    } else {
      dispatch(addContacts({ id, name, number }));
    }
  };

  const getFilteredContacts = () => {
    console.log(contacts)
    const filterContactsList = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filterValue);
    });

    return filterContactsList;
  };

  return (
    <div>
      <Section title="Phonebook">
        <ContactForm onSubmit={contactsSubmit} />
      </Section>
      <Section title="Contacts">
        <Filter filter={filterValue} />
        <ContactList
          contacts={getFilteredContacts()}
          contactsDelete={e => dispatch(removeContacts(e))}
        />
      </Section>
    </div>
  );
}
