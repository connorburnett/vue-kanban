var express = require('express')
var router = express.Router()
var user = require('../models/user')
let Boards = require('../models/board')
let Lists = require('../models/list')
let Tasks = require('../models/task')
let Comments = require('../models/comment')

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
  listTasks: {
    path: '/boards/:boardId/lists/:listId/tasks',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find List Tasks'
      Lists.findById(req.params.listId)
        .then(list => {
          Tasks.find({ listId: list._id })
            .then(tasks => {
              list.tasks = tasks
              console.log(list)
              res.send(handleResponse(action, list))
            }).catch(error => {
            })
          return next(handleResponse(action, null, error))
        })
    }
  },
  taskComments: {
    path: '/boards/:boardId/lists/:listId/tasks/:taskId/comments',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find Task Comments'
      Tasks.findById(req.params.taskId)
        .then(task => {
          Comments.find({ taskId: task._id })
            .then(comments => {
              task.comments = comments
              console.log(task)
              res.send(handleResponse(action, task))
            }).catch(error => {
            })
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