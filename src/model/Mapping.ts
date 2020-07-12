import { Keys } from './Keys';
import fs from 'fs';

export class Mapping {
  get keys(): Keys {
    return JSON.parse(fs.readFileSync(`./alphabet.json`).toString());
  }
}
