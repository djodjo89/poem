import { Keys } from './Keys';
import { mappingJson } from '../Main';

export class Mapping {
  private readonly _keys: Keys;

  constructor() {
    this._keys = mappingJson;
  }

  get keys(): Keys {
    return this._keys;
  }
}
