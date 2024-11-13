const User = require("../models/User");
const bcrypt = require('bcrypt');

class UserController {
    static saltRounds = 10;
    
    static async findUserById(req, res){
        const { id } = req.params
        try{
            const user = await User.findById(id);
            if (user !== null){
                return res.status(200).json(user);
            } else {
                return res.status(404).json({error: `User by id: ${id} does not exist!`});
            }
        } catch (error){
            console.error("An error occured, ", error);
            return res.status(500).json({error: "failed to retrieve user"})
        }
    }

    static async findUserByUsername(req, res) {
        const { username } = req.params;
        
        try {
            const user = await User.findByUsername(username);
            
            if (user !== null){
                return res.status(200).json(user);
            }
            else{
                return res.status(404).json({error: `User with Username: ${username} does not exist!`})
            }
        } catch (error){
            console.error("An error occured, ", error);
            return res.status(500).json({error: "An error occured when trying to find the user!"});
        }
    }

    static async createUser(req, res){
        const {username, password} = req.body;

        try {
            const existing_user_check = await User.findByUsername(username);
            if (existing_user_check !== null){
                return res.status(404).json({error: `User with the username: ${username} already exists.`})
            } else {
                const hashed_password = await bcrypt.hash(password, this.saltRounds);
                const new_user = await User.addNewUser(username, hashed_password);
                return res.status(201).json(new_user);           
            }
        } catch (error){
            console.error("An error occured trying to create a user, ", error);
            return res.status(500).json({error: 'An error occured when creating new user!'});
        }
    }

    static async checkLoginInfo(req, res){
        const {username, password} = req.body;

        try {
            const user = await User.findByUsername(username);
            if (user === null){
                return res.status(404).json({error: `User with the username: ${username} does not exist!`});
            }
            if (await bcrypt.compare(password, user.password_hash)){
                return res.status(200).json(user);
            } else {
                return res.status(404).json({error: `Passwords do not match.`})
            }
        } catch (error){
            console.error("An error occured: ", error);
            return res.status(500).json({error: 'An Error occured when trying to check user log in information!'})
        }
    }

    static async deleteUser(req, res){
        const { username, password } = req.body;
        
        try {
            const user = await User.findByUsername(username);
            if (user === null){
                return res.status(404).json({error: `User with the username: ${username} does not exist.`})
            }
            if (await bcrypt.compare(password, user.password_hash)){
                await User.removeUserById(user.id);
                return res.status(200).json({message: 'Successfully deleted user!'})
            } else {
                return res.status(404).json({error: `The passwords did not match the account!`})
            }
        } catch (error){
            console.error("An error occured, ", error);
            return res.status(500).json({error: "An error occured when trying to delete user"})
        }
    }
}