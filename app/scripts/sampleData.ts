import { Contact } from '../db/models/contacts';
import faker from 'faker';

async function addRandomContacts(amount: number) {
  await Contact.create({
    name: `${faker.name.prefix()} ${faker.name.firstName()} ${faker.name.lastName()}`,
    job: `${faker.name.jobTitle()} ${faker.random.word()} ${faker.name.jobType()}`,
    isMale: faker.random.boolean(),
    age: Math.floor(Math.random() * 100),
    lockUntil: null,
  });

  if (amount) {
    return addRandomContacts(amount - 1);
  }
  process.exit(0);
}

addRandomContacts(10);
