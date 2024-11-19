import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import User from '../../api/models/user.model';
import UserRole from '../../api/enums/user-role.enum';

interface AuthContextValue {
  /**
   * The currently authenticated user.
   */
  user: User | null;
  /**
   * Callback to log in a user.
   *
   * @param {string} email The user's email.
   * @param {string} password The user's password.
   * @returns {void}
   */
  login: (email: string, password: string) => void;
  /**
   * Callback to log out a user.
   *
   * @returns {void}
   */
  logout: () => void;
  /**
   * Callback to register a user.
   *
   * @param {string} email The user's email.
   * @param {string} password The user's password.
   * @returns {void}
   */
  register: (payload: Omit<User, 'id' | 'role'>) => void;
}

const AuthContext = createContext({} as AuthContextValue);

export const useAuth = () => useContext(AuthContext);

const adminUser: User = {
  id: 1,
  firstName: 'Pedro',
  lastName: 'Castro',
  email: 'admin@test.com',
  password: 'admin',
  role: UserRole.Admin,
};

export default function AuthProvider({children}: PropsWithChildren) {
  const [user, setUser] = useState<AuthContextValue['user']>(null);
  const [existingUsers, setExistingUsers] = useState<User[]>([adminUser]);

  const login: AuthContextValue['login'] = useCallback(
    (email, password) => {
      const user = existingUsers.find(
        user => user.email === email && user.password === password,
      );

      if (!user) {
        throw new Error('Invalid credentials');
      }

      setUser(user);
    },
    [existingUsers],
  );

  const logout: AuthContextValue['logout'] = useCallback(() => {
    setUser(null);
  }, []);

  const register: AuthContextValue['register'] = useCallback(
    payload => {
      const existingUser = existingUsers.some(
        user => user.email === payload.email,
      );

      if (existingUser) {
        throw new Error('User already exists');
      }

      if (payload.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      if (payload.firstName.length < 2) {
        throw new Error('First name must be at least 2 characters long');
      }

      if (payload.lastName.length < 2) {
        throw new Error('Last name must be at least 2 characters long');
      }

      const newUser: User = {
        ...payload,
        id: existingUsers.length + 1,
        role: UserRole.Employee,
      };

      setExistingUsers([...existingUsers, newUser]);
    },
    [existingUsers],
  );

  useEffect(() => {
    console.log(
      '[AuthProvider] existingUsers updated',
      JSON.stringify(existingUsers, null, 4),
    );
  }, [existingUsers]);

  return (
    <AuthContext.Provider value={{user, login, logout, register}}>
      {children}
    </AuthContext.Provider>
  );
}
