import Dexie from 'dexie';


class MyDatabase extends Dexie {
    constructor() {
        super('chat');

        this.version(1).stores({
            Users: '++id, name, userId',
    });
}
}
export const db = new MyDatabase();