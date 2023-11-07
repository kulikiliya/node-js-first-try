const fs = require("fs/promises");
const path = require("path");
const nanoid = require("nanoid");

// Розкоментуй і запиши значення

const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: задокументувати кожну функцію
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.

  const data = await listContacts();
  const dataById = data.find((item) => item.id === contactId);
  return dataById || null;
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);

  if (index === -1) return null;

  const [result] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту.
  const data = await listContacts();
  const newContact = { id: nanoid.nanoid(), name, email, phone };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
