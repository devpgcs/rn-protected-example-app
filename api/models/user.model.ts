import UserRole from '../enums/user-role.enum';

export default interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}
