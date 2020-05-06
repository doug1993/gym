const {age}= require('../../utils')
const {date}= require('../../utils')

//Here I show how to do exportation of a faster manner 
module.exports = {
    index(req,res){
        return res.render('members/index')
    },
    show(req,res){
        return 
    },
    post(req,res){
        const keys = Object.keys(req.body)

    for(key of keys){
        //o mesmo que eu loopar req.body.avatar_url
       if(req.body[key]=="") {
            return res.send('Please fill all the filds')
       }
    }
       
    },
    edit(req,res){
        return 
    },
    put(req,res){
        return
    },
    delete(req,res){
        return
    }
}