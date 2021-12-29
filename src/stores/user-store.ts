import { writable } from 'svelte/store';
import type { IUser } from './interfaces';

const defaultUser = {
  name: undefined,
  signedIn: false,
  sessionId: undefined
};

export const userObservable = (() => {
  const { subscribe, set } = writable<IUser>(defaultUser);

  const signIn = (user: Omit<IUser, 'signedIn'>) => {
    console.log('SIGN IN', user);
    set({ ...user, signedIn: true });
  };

  const signOut = () => {
    set(defaultUser);
  };

  return {
    subscribe,
    signIn,
    signOut
  };
})();
