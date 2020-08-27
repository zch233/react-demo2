import React from 'react';
declare global {
  interface ObjectConstructor {
    typedKeys<T>(o: T): Array<keyof T>;
  }
}

Object.typedKeys = Object.keys;
