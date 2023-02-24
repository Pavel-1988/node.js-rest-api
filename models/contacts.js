const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');


const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const resultString = await fs.readFile(contactsPath, "utf8");
  const result = JSON.parse(resultString);
  return result

}

const getContactById = async (id) => {
    const contacts = await listContacts();
    const contactById = contacts.find(contact => contact.id === id);
    return contactById ? contactById : null;
}

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === id);
  const removedContact = contacts[index];
  
  if (index !== -1) {
  contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  };
  
  return removedContact ? removedContact : null
}

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact
}

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...body }
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
