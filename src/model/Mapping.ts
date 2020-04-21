import { Keys } from './Keys';
import fs from 'fs';
import os from 'os';

const mappingJson = JSON.parse(fs.readFileSync(`${os.homedir()}/Documents/poem/alphabet.json`).toString());

export class Mapping {
  private readonly _keys: Keys;

  constructor() {
    this._keys = mappingJson;
  }

  get keys(): Keys {
    return this._keys;
  }
}
