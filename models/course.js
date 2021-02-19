var mongoose = require('mongoose')
const { get } = require('../routes')
var Schema = mongoose.Schema

var CourseSchema = new Schema({
    lecture_code: {type: String, required: true },
    lecture_title: {type: String},
    lecture_season: {type: String},
    teacher_name: {type: String},
    like: {type: Number},
    unlike: {type: Number},
    is_early_course: {type:Number},
})

// virtual for course's URL
CourseSchema
.virtual('url')
.get(function (){
    return '/courses/' + this._id
})

// Export model
module.exports = mongoose.model('Course', CourseSchema)