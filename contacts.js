import * as fs from 'fs/promises';
import * as path from 'path';
import { handleError } from './lib/handleError.js';
import { v4 as generateId } from 'uuid';

const contactsPath = path.resolve(
  'db/contacts.json'
);

const encoding = 'utf8';

async function getContacts() {
  try {
    const result = await fs.readFile(
      contactsPath,
      encoding
    );
    const contacts = JSON.parse(result);
    return contacts;
  } catch (error) {
    handleError(error);
  }
}

// TODO: задокументировать каждую функцию
export async function listContacts() {
  try {
    const contacts = await getContacts();
    contacts.forEach((contact) => {
      console.log(contact.name);
    });
  } catch (error) {
    handleError(error);
  }
}

export async function getContactById(
  contactId
) {
  try {
    const contacts = await getContacts();
    const requiredContact = contacts.filter(
      ({ id }) => id === contactId
    );
    console.table(requiredContact);
  } catch (error) {
    handleError(error);
  }
}

export async function removeContact(
  contactId
) {
  try {
    const contacts = await getContacts();
    if (
      contacts.find(
        ({ id }) => id === contactId
      )
    ) {
      const updatedContactList = contacts.filter(
        ({ id }) => id !== contactId
      );
      await fs.writeFile(
        contactsPath,
        JSON.stringify(
          updatedContactList
        )
      );
      console.log(
        `contact with id ${contactId} was deleted`
      );
      listContacts();
      return;
    }
    console.log(
      `no contact with this ${contactId}`
    );
    listContacts();
  } catch (error) {
    handleError(error);
  }
}

export async function addContact(
  name,
  email,
  phone
) {
  try {
    const contacts = await getContacts();
    const newContact = {
      id: generateId(),
      name,
      email,
      phone,
    };
    const updatedContactList = [
      ...contacts,
      newContact,
    ];
    await fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContactList)
    );
    console.log(
      `contact ${name} was added`
    );
    listContacts();
  } catch (error) {
    handleError(error);
  }
}
