const db = require('../db/db')

class User{

    constructor(id, username, password_hash){
        this.id = id;
        this.username = username;
        this.password_hash = password_hash;
    }

    static async findbyid(id){
        const [rows] = await db.execute("SELECT * FROM Users WHERE id = ?", [id]);
        if (rows.length > 0){
            const {id, username, password_hash} = rows[0];
            return new User(id, username, password_hash);
        }
        return null;
    }

    static async findbyUsername(username){
        const [rows] = await db.execute("SELECT * FROM Users WHERE username = ?", [username]);
        if (rows.length > 0){
            const {id, username, password_hash} = rows[0];
            return new User(id, username, password_hash);
        }
        return null;
    }

    static async addNewUser(username, password_hash){
        const [result] = await db.execute("INSERT INTO Users (username, password_hash) VALUES (? ?)", [username, password_hash])
        const user_id = result.insertId;
        const found = await db.execute("SELECT * FROM Users WHERE id = ?", [user_id])
        if (found.length > 0){
            const {id, username, password_hash} = found[0];
            return new User(id, username, password_hash);
        }
        return null;

    }

    static async removeUserById(id){
        const result = await db.execute("DELETE FROM Users WHERE id = ?", [id]);
        return result;
    }
}