import cluster from 'cluster';
import { v4 as uuid } from "uuid";
import { User } from '../types/types';

import { setData } from './db';
export default class UserDB {

	// static getAll() {
	// 	throw new Error("Method not implemented.");
	// }
    _users_database: Array<User> = [];

    constructor (users: Array<User>) {
        this._users_database = users
    }

    setUsers (users: Array<User>) {
        this._users_database = users
    }

    getAll () {
        return this._users_database
    }

    getOne (uid: string) {
        return this._users_database.find(u => u.id === uid)
    }

    updateOne (uid: string, data: User) {
        this._users_database = this._users_database.map(u => {
            if (u.id === uid) {
                if (data.username) u.username = data.username;
                if (data.age) u.age = data.age;
                if (data.hobbies) u.hobbies = data.hobbies;
            }
            return u
        })
        cluster.isWorker && setData('users', this._users_database)
        return this.getOne(uid)
    }

    deleteOne (uid: string) {
        this._users_database = this._users_database.filter(u => u.id !== uid).map(user => user)
        cluster.isWorker && setData('users', this._users_database)
    }

    insertUser (data: User) {
        const id = uuid()
        this._users_database.push({id, ...data})
        return { id, ...data }
    }

}

