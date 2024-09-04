import type { User } from '../schemas/user.schema';

interface IUserPGDB {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  password: string;
}

export const mapUserPGDBtoUserMongoDB = (data: IUserPGDB[]): User[] => {
  return data.map((userFromPGDB) => {
    const user: User = {
      email: userFromPGDB.email,
      password: userFromPGDB.password,
    };
    return user;
  });
};
