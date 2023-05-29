const { Schema, model } = require('mongoose');



const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;