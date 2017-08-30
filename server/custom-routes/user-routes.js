var express = require('express')
var router = express.Router()
var user = require('../models/user')
let Boards = require('../models/board')
let Lists = require('../models/list')

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
  },
  boardLists: {
    path: '/boards/:boardId/lists',
      reqType: 'get',
        method(req, res, next) {
      let action = 'Find Board Lists'
      Lists.find({ boardId: req.params.boardId })
        .then(lists => {
          res.send(handleResponse(action, lists))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
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