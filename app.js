// Implement a Key-Value Store with simple add, get, and delete functions.
// Add a historical backlog with the date 
// kvs.add('a', 10)  WE NEED TO ADD THE DATE FOR EXAMPLE Yestedart at 7:00 am
// kvs.add('b', 20)  WE NEED TO ADD THE DATE FOR EXAMPLE Yestedart at 7:00 am
// kvs.add('a', 30)  WE NEED TO ADD THE DATE FOR EXAMPLE Today at 2:00 pm
// kvs.get('a') RETURN 30
// kvs.delete('b') 

const { values } = require("lodash");

// kvs.get_at_effective_date('a', 'Yesterday AT 10:00am' )  RETURN 10
// kvs.get_at_effective_date('a', 'Today AT 5:00 pm' ) RETURN 30


// kvs.add('a', 10)
// kvs.add('a', 30)
// kvs.get_at_effective_date('a', 'Today AT 5:00 pm' ) 

// First Code Interview Response
/*
class KeyValueStore{
    
    constructor(){
        this.store = {};
        this.history = [];
    }
    
    add(key, value){
        const timestamp = new Date();
        this.store[key] = value;
        this.history.push({key, value, timestamp});
    }
    add_mook(key, value, timestamp){
        this.store[key] = value;
        this.history.push({key, value, timestamp});
    }
    get(key){
        return this.store[key];
    }
    get_history(){
        return this.history;
    }
    delete(key){
        if(this.store.hasOwnProperty(key)){
            const timestamp = new Date();
            const value = this.get(key);
            this.history.push({key, value, timestamp});
            delete this.store[key];
        }
    }
    delete_mook(key, timestamp){
        if(this.store.hasOwnProperty(key)){
            const value = undefined;
            this.history.push({key, value, timestamp});
            delete this.store[key];
        }
    }
    get_at_effective_date(key, effectiveDate){
        const targetDate = new Date(effectiveDate);
        const relevantRecors = this.history.filter((record) => record.key === key);
        
        let effectiveValue = undefined;
        for(let i = relevantRecors.length -1; i>= 0; i--){
            const record = relevantRecors[i];
            const recordDate = new Date(record.timestamp);
            if(recordDate <= targetDate ){
                effectiveValue = record.value;
                break;
            }
        }
        return effectiveValue;
    }
}
const kvs = new KeyValueStore();

kvs.add('a',10);
kvs.add('b',20);


console.log(kvs.get('a'));
kvs.delete('b');
console.log(kvs.get('b'));

console.log('-----------------------');


const  demo_add_mook_1 = new Date('2023-10-19T21:45:45.135Z');
const  demo_add_mook_2 = new Date('2023-10-19T21:45:56.136Z');

// kvs.add_mook('a',10, demo_add_mook_1);
kvs.add_mook('a',30, demo_add_mook_2);
kvs.add_mook('a',10, demo_add_mook_1);

console.log(kvs.get_history());
console.log(kvs.get_at_effective_date('a', demo_add_mook_1))
console.log(kvs.get_at_effective_date('a', demo_add_mook_2))

console.log('-----------------------');

const  demo_add_mook_3 = new Date('2023-10-19T21:57:56.136Z');

kvs.delete_mook('a');
console.log(kvs.get('a'));
console.log(kvs.get_at_effective_date('a', demo_add_mook_3))


console.log('-----------------------');
*/

// Clean and Resolve Technical Gap.

class KeyValueStore {
    constructor() {
        this.store = {};
        this.history = [];
    }

    add(key, value, effectiveDate = new Date()) {
        this.store[key] = value;
        this.history.push({ key, value, timestamp: effectiveDate });
    }

    get(key) {
        return this.store[key];
    }

    delete(key) {
        if (this.store.hasOwnProperty(key)) {
            const value = this.get(key);
            delete this.store[key];
            this.history.push({ key, value, timestamp: new Date() });
        }
    }

    get_at_effective_date(key, effectiveDateTime) {
        const targetDateTime = new Date(effectiveDateTime);

        const relevantRecords = this.history
            .filter((record) => record.key === key)
            .sort((a, b) => b.timestamp - a.timestamp);

        for (const record of relevantRecords) {
            if (record.timestamp <= targetDateTime) {
                return record.value;
            }
        }

        return undefined;
    }
}

const kvs = new KeyValueStore();

kvs.add('a', 10, new Date('2023-10-18T07:00:00.000Z'));
kvs.add('b', 20, new Date('2023-10-18T07:00:00.000Z'));
kvs.add('a', 30, new Date('2023-10-19T14:00:00.000Z'));

console.log(kvs.get('a')); // Debería devolver 30
kvs.delete('b');
console.log(kvs.get('b')); // Debería devolver undefined

console.log('-----------------------');

console.log(kvs.get_at_effective_date('a', '2023-10-19T17:00:00.000Z')); // Debería devolver 30
console.log(kvs.get_at_effective_date('a', '2023-10-18T10:00:00.000Z')); // Debería devolver 10

console.log('-----------------------');
