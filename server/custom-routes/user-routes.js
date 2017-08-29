var express = require('express')
var router = express.Router()
var user = require('../models/user')
let Boards = require('../models/board')

router

  .get('/', (req, res, next) => {
    user.find({})
      .then(user => {
        res.send(user)
      })
      .catch(next)
  })


  .post('/', (req, res, next) => {
    user.create(req.body)
      .then(user => {
        res.send("Success")
      }).catch(next)
  })

// ERROR HANDLER
router.use('/', (err, req, res, next) => {
  if (err) {
    res.send(418, {
      success: false,
      error: err.message
    })
  } else {
    res.send(400, {
      success: false,
      error: 'Something failed please try again later'
    })
  }
})

module.exports = router

module.exports = {
  userBoards: {
    path: '/userboards',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find User Boards'
      Boards.find({ creatorId: req.session.uid })
        .then(boards => {
          res.send(handleResponse(action, boards))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  sharedBoards: {
    path: '/sharedBoards',
    reqType: 'get',
    method(req, res, next) {
      Boards.find({ collaborators: { $in: req.session.uid } })
        .then(boards => {
          res.send(handleResponse(action, boards))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  }
}


function handleResponse(action, data, error) {
  var response = {
    action: action,
    data: data
  }
  if (error) {
    response.error = error
  }
  return response
}