import { Collection } from 'mongodb';

export type User = {
  name: string;
  email: string;
  access_token?: string;
  last_login?: string;
  sessionId?: string;
  sessionIdExpires?: string;
};

export type CollectionCache = {
  [name: string]: Collection;
};
