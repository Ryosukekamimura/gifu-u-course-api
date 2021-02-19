var Course = require('../models/course')
var Comment = require('../models/comments')

const { body, validationResult } = require('express-validator')
var async = require('async')

// GET 前期授業を表示する
exports.early_course_list = function(req, res, next) {
    Course
        .find({is_early_course: 1}, function(err, result){
            if (err) { return next(err) }
            res.json(result)
        })
}

// GET 前期授業の詳細を表示する
exports.early_course_details = function(req, res, next) {
    Course
        .findById(req.params.id)
        .exec(function(err, result) {
            if (err) { return next(err) }
            res.json(result)
        })
}

// GET 後期授業を表示する
exports.latter_course_list = function(req, res, next){
    Course
        .find({is_early_course: 0}, function(err, result){
            if (err) { return next(err) }
            res.json(result)
        })
}

// GET 後期授業の詳細を表示する
exports.latter_course_details = function(req, res, next){
    Course
        .findById(req.params.id)
        .exec(function(err, result){
            if (err) { return next(err) }
            res.json(result)
        })
}

// GET コメントのリストを表示する
exports.comments_list = function(req, res, next){
    console.log(req.params.id)
    Comment
        .find({course_id: req.params.id}, function(err, result){
            if (err) { return next(err) }
            console.log(result)
            res.json(result)
        })
}

// POST コメントを追加する
exports.comments_craete_post = function(req, res, next){
    // Extract validation errors from a request
    const errors = validationResult(req)
    console.log(req.body)
    // Create New Comments
    var comment = new Comment({
        course_id: req.body.course_id,
        comment: req.body.comment,
        poster: req.body.poster,
        serverTimeStamp: req.body.serverTimeStamp
    })

    if (!errors.isEmpty()){
        console.log('Error: '+ errors)
    }
    else{
        comment.save(function(err){
            if (err) {
                console.log(err)
                return next(err)
            }
            console.log('成功しました')
        })
    }
}


