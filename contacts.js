const fs = require('fs').promises;
const path = require('path')
const { uuid } = require('uuidv4');

const contactsPath = path.join(__dirname, "./db/contacts.json");


async function listContacts() {
  const data = await fs.readFile(contactsPath)
  return JSON.parse(data)
}

async function getContactById(contactId) {
  const data = await listContacts()
  const result = data.find(e => e.id === contactId)
  if (!result) {
    throw new Error(`Contact with id=${contactId} not found`);
  }
  return result;
}

async function removeContact(contactId) {
  const data = await listContacts()
  const result = data.find(e => e.id === contactId)
  if (!result) {
    throw new Error(`Contact with id=${contactId} not found`);
  } else {
    const newData = data.filter(e => e.id !== contactId)
    await fs.writeFile(contactsPath, JSON.stringify(newData, null, 2))
  }
  return result;
}

async function addContact(name, email, phone) {
  const data = await listContacts()
  const newContact = { id: uuid(), name, email, phone }
  await fs.writeFile(contactsPath, JSON.stringify([...data, newContact], null, 2))
  return newContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};