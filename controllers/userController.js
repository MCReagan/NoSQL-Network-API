const { Reaction, Thought, User } = require('../models');

module.exports = {

    async getUsers(req, res) {
        try {
            const users = await User.find();

            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }).select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }
            res.json(user);
        } catch (err) {
            console.err(err);
            return res.status(500).json(err);
        }
    }
}