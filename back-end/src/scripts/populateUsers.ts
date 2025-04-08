import { User } from '../models/user.model';
import { users } from './users';

export const populateUsers = async () => {
  const usersCount = await User.countDocuments();
  if (usersCount > 0) {
    return;
  }
  await User.insertMany(users);
};
