var models = require('../config/constants').models
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String },
	created: { type: Number, default: Date.now() },
    // Relations
    listId: { type: ObjectId, ref: models.list.name, required: true },
    boardId: { type: ObjectId, ref: models.board.name, required: true },
    comments: { type: Array }
});

module.exports = mongoose.model(models.task.name, schema);