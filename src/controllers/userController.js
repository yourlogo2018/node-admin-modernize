import User from '../models/userModel.js';

class UserController {

    static async add(req, res, next) {
        const data = req.body.data;
    
        try {
            const newUser = await User.createUser(data);
            res.status(201).json(newUser);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    static async get(req, res, next) {
       
        try {
            const users = await User.getUsers();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async get_by_id(req, res, next) {
        const id = req.params.id;
    
        try {
            const user = await User.getUser(id);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async update(req, res, next) {
        const id = req.body.id;
        const data = req.body.data;
    
        try {
            const user = await User.updateUser(id, data);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async delete(req, res, next) {
        const id = req.body.id;
    
        try {
            const user = await User.deleteUser(id);
            res.status(200).json({message: 'User deleted successfully'});
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

export default UserController;
