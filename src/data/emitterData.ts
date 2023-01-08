import cluster from "cluster";
import EventEmitter from "events";

interface User {
    id: string,
    username: string,
    age: number,
    hobbies: []
}

export class UserEmitter extends EventEmitter {
    private readonly users: User[] = [];

    async test () {
        if (cluster.isWorker){
            console.log('this', this);
        }
    }

}