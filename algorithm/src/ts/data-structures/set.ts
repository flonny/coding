export default class Set<T> {
    private items: any;
    constructor() {
        this.items = {}
    }
    size() {
        return this.values().length
    }
    isEmpty() {
        return this.size() === 0
    }
    add(item: T) {
        if (this.has(item)) {
            return false
        }
        this.items[item] = item
        return true
    }
    has(item: any) {
        return item in this.items
    }
    delete(item: T) {
        if (this.has(item)) {
            delete this.items[item]
            return true
        }
        return false
    }
    clear() {
        this.items = {}
    }
    values(): T[] {
        return Object.values(this.items);
    }
    union(otherSet: Set<T>) {
        const unionSet = new Set<T>();
        this.values().forEach(value => unionSet.add(value));
        otherSet.values().forEach(value => unionSet.add(value));

        return unionSet;
    }
    intersection(otherSet: Set<T>) {
        const unionSet = new Set<T>(); 
        this.values().forEach(value => {
            if(otherSet.has(value)) {
                unionSet.add(value)
            }
        });
        return unionSet
    }
    difference(otherSet: Set<T>)  {
        const differenceSet = new Set<T>(); 
        this.values().forEach(value => {
            if(!otherSet.has(value)) {
                differenceSet.add(value)
            }
        });
        return differenceSet
    }
    isSubsetOf(otherSet:Set<T>) {
        return this.intersection(otherSet).size() === this.size()
    }
    toString() {
        return this.values().join(',')
    }
}
