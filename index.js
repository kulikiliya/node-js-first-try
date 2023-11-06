const contacts = require("./contacts.js");

// для управления нашими action
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");
program.parse(process.argv);
const argv = program.opts();
// для управления нашими action

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await contacts.listContacts();
      console.table(list);
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const addedContact = await contacts.addContact(name, email, phone);
      console.log(addedContact);
      break;

    case "remove":
      const removeContact = await contacts.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "qdggE76Jtbfd9eWJHrssH" });
// invokeAction({
//   action: "add",
//   id: "testID12",
//   name: "testName",
//   email: "testEmail",
//   phone: "testPhone",
// });
// invokeAction({ action: "remove", id: "testID12" });
