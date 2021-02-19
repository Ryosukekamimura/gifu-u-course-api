var express = require('express')
var router = express.Router()
// Require controller modules
var course_controller = require('../controllers/courseController')

/// COURSES ROUTES ///

// GET 前期授業を表示する
router.get('/early', course_controller.early_course_list)

// GET 前期授業の詳細を表示する
router.get('/early/:id', course_controller.early_course_details)

// GET 後期授業を表示する
router.get('/latter', course_controller.latter_course_list)

// GET 後期授業の詳細を表示する
router.get('/latter/:id', course_controller.latter_course_details)

// // get plus button
// router.get('/likes/:id/plus/', course_controller.course_like_plus)
//
// // get minus button
// router.get('/likes/:id/minus/', course_controller.course_like_minus)


// GET request for comments list
router.get('/:id/comments', course_controller.comments_list)

// POST request for posting comments
router.post('/create/comments', course_controller.comments_craete_post)




module.exports = router