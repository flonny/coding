import { defaultToString } from '../util';
import { ValuePair } from './models/value-pair';
export default class Dictionary<K, V> {
    private table: { [key: string]: ValuePair<K, V> };
    constructor(private toStrFn: (key: K) => string = defaultToString) {
      this.table = {};
    }
    size() {
        return Object.keys(this.table).length;
    }
    isEmpty() {
        return this.size() === 0;
    }
    set(key: K, value: V) {
        if (key != null && value != null) {
          const tableKey = this.toStrFn(key);
          this.table[tableKey] = new ValuePair(key, value);
          return true;
        }
        return false;
      }
      get(key: K): V {
        const valuePair = this.table[this.toStrFn(key)];
        return valuePair == null ? undefined : valuePair.value;
      }
    clear() {
        this.table = {};
    }
}
