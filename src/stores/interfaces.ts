import type { Subscriber, Unsubscriber } from 'svelte/store';
export type Store<T, V> = T & {
  subscribe: (this: void, run: Subscriber<V>) => Unsubscriber;
};

export interface ISyncPreferences {}

export interface IUser {
  name: string | undefined;
  signedIn: boolean;
  sessionId: string | undefined;
}
