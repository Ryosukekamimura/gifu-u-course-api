var mongoose = require('mongoose')
const { get } = require('../routes')
var Schema = mongoose.Schema

var CommentSchema = new Schema({
  course_id: {type: String},
  comment: {type: String},
  poster: {type: String},
  serverTimeStamp: {type: Date},
})

// Export Models
module.exports = mongoose.model('Comment', CommentSchema)