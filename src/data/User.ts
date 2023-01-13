import { v4 as uuid } from "uuid";
import { User } from '../types/types';

export default class UserDB {

    _users: Array<User> = [];

    constructor () {
        this._users = []
    }

    setUsers (users: Array<User>) {
        this._users = users
    }

    getAll () {
        return this._users
    }

    getOne (id: string) {
        return this._users.find((user:User) => user.id === id)
    }

    updateOne (id: string, data: User) {
        this._users = this._users.map(u => {
            if (u.id === id) {
                if (data.username) u.username = data.username;
                if (data.age) u.age = data.age;
                if (data.hobbies) u.hobbies = data.hobbies;
            }
            return u
        })
        return this.getOne(id)
    }

    deleteOne (id: string) {
        if (this.getOne(id)){
            return this._users = this._users.filter(u => u.id !== id)
        } else {
            return false
        }
    }

    insertUser (data: User) {
        const id = uuid()
        this._users.push({id, ...data})
        return { id, ...data }
    }

}

