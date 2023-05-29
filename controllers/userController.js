const { Thought, User } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find().populate('thoughts').populate('friends');

            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }).populate('thoughts').populate('friends').select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                req.body,
                { new: true }
            ).select('-__v');

            if (!updatedUser) {
                return res.status(404).json({ message: 'No such user exists' });
            }

            res.json(updatedUser);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No such user exists' });
            }

            res.json({ message: 'User successfully deleted' });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true, runValidators: true }
            )

            if (!user) {
                res.status(404).json({ message: 'No such user exists' });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async removeFriend(req, res) {
        try {

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}