const db = require('../db/db')

class User{

    constructor(id, username, password_hash){
        this.id = id;
        this.username = username;
        this.password_hash = password_hash;
    }

    static async findById(id){
        try{
            const [rows] = await db.execute("SELECT * FROM Users WHERE id = ?", [id]);
            if (rows.length > 0){
                const {id, username, password_hash} = rows[0];
                return new User(id, username, password_hash);
            }
            return null;
        } catch (error) {
            console.error("An error occured: ", error)
            throw error
        }
    }

    static async findByUsername(username){
        try {
            const [rows] = await db.execute("SELECT * FROM Users WHERE username = ?", [username]);
            if (rows.length > 0){
                const {id, username, password_hash} = rows[0];
                return new User(id, username, password_hash);
            }
            return null;
        } catch (error){
            console.error("An Error occured: ", error)
            throw error;
        }
    }

    static async addNewUser(username, password_hash){
        try {
            const [result] = await db.execute("INSERT INTO Users (username, password_hash) VALUES (?, ?)", [username, password_hash])
            const user_id = result.insertId;
            const [found] = await db.execute("SELECT * FROM Users WHERE id = ?", [user_id])
            if (found.length > 0){
                const {id, username, password_hash} = found[0];
                return new User(id, username, password_hash);
            }
            return null;
        } catch (error){
            console.error("An Error occured: ", error)
            throw error;
        }
    }

    static async removeUserById(id){
        try{
            await db.execute("DELETE FROM Users WHERE id = ?", [id]);
            return true;
        } catch (error){
            console.error("An Error occured: ", error)
            throw error;
        }
    }
}

module.exports = User;