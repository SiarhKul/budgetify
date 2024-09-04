import { mapUserPGDBtoUserMongoDB } from './migrations-manual';
import type { User } from '../schemas/user.schema';

const DUMMY_DATA = [
  {
    first_name: 'Bob',
    last_name: 'Williams',
    email: 'bob.williams@example.com',
    address: '101 Pine St, City, Country',
    password: 'password101',
  },
  {
    first_name: 'Charlie',
    last_name: 'Brown',
    email: 'charlie.brown@example.com',
    address: '202 Maple St, City, Country',
    password: 'password202',
  },
];

describe('GIVEN postgres db', () => {
  it('should map correct data', () => {
    const result: User[] = mapUserPGDBtoUserMongoDB(DUMMY_DATA);

    expect(result[0].password).toBe(DUMMY_DATA[0].password);
    expect(result[1].password).toBe(DUMMY_DATA[1].password);
  });
});
