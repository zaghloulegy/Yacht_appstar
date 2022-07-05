import {createContext} from 'react';

interface UserContextInterface {
  signOut: any,
}

export const UserContext = createContext<UserContextInterface['signOut'] | null>(null);
