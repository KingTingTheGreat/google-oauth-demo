import { Collection } from 'mongodb';

export type User = {
  name: string;
  email: string;
  access_token?: string;
};

export type CollectionCache = {
  [name: string]: Collection;
};
