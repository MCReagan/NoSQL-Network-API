const { Thought, User } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find().populate('reactions');

            res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).populate('reactions').select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const { thoughtText, username } = req.body;

            const thought = await Thought.create({ thoughtText, username });

            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $push: { thoughts: thought._id } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                req.body,
                { new: true }
            ).select('-__v');

            if (!updatedThought) {
                return res.status(404).json({ message: 'No such thought exists' });
            }

            res.json(updatedThought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No such thought exists' });
            }

            res.json({ message: 'Thought successfully deleted' });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async addReaction(req, res) {
        try {

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async removeReaction(req, res) {
        try {

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}