const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");
const argv = process.argv;

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(data);

    if (parsedContacts.length === 0) {
      return console.log(`No contacts`);
    }
    console.table(parsedContacts);
  } catch (err) {
    console.log(err);
  }
};

async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(data);
  const item = parsedContacts.filter((contact) => contact.id === contactId);
  console.log(item);
}

async function removeContact(id) {
  const data = await fs.readFile(contactsPath);
  const content = JSON.parse(data);
  const items = content.filter((item) => item.id !== id);
  await fs.writeFile(contactsPath, JSON.stringify(items));
}

const addContact = async (name, email, phone) => {
  try {
    const data = await fs.readFile(contactsPath);
    const content = JSON.parse(data);
    const id = content[content.length - 1].id + 1;
    const contacts = { id, name, email, phone };
    content.push(contacts);
    await fs.writeFile(contactsPath, JSON.stringify(content));
  } catch (err) {
    console.log(err);
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };
