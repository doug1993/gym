const express = require('express')
const routes= express.Router()
const instructors= require('./app/controllers/instructors')
const members = require ('./app/controllers/members')

routes.get('/', function(req,res){
    return res.redirect('/instructors')
})

routes.get('/instructors', instructors.index)

//this is outher form to write route
routes.get('/instructors/create', function(req,res){
   return res.render('instructors/create')
})
routes.get('/instructors/:id/edit',instructors.edit)

routes.post('/instructors', instructors.post)

routes.get('/instructors/:id', instructors.show)

routes.put('/instructors', instructors.put)

routes.delete('/instructors', instructors.delete)


routes.get('/members', members.index)

//this is outher form to write route
routes.get('/members/create', function(req,res){
   return res.render('members/create')
})
routes.get('/members/:id/edit',members.edit)

routes.post('/members', members.post)

routes.get('/members/:id', members.show)

routes.put('/members', members.put)

routes.delete('/members', members.delete)

module.exports= routes