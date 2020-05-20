
const Instructor = require('../model/Instructor')
const {age, date}= require('../../utils')

//Here I show how to do exportation of a faster manner      
    
module.exports = {
   // Call for short hand object properties*/
    index(req,res){
        let {filter, page, limit} = req.query
        // utilizado  para selecionar os cadastros como array 
        page = page ||1
        limit = limit ||2
        let offset = limit * (page-1)

        const params = {
            filter, 
            page, 
            limit, 
            offset,
            callback(instructors){
                const pagination ={
                    total: Math.ceil(instructors [0].total / limit),
                    page
                }
         
                return  res.render("instructors/index", {instructors, pagination, filter  })
                
            }
        }

        Instructor.paginate(params)

    },
    show(req,res){
        Instructor.find(req.params.id, function(instructor){
            if(!instructor){res.send('Instructor not Found!!')}
            instructor.age = age(instructor.birth)
            instructor.since = date(instructor.created_at)

            return res.render('instructors/show', {instructor})
        })
    },
    post(req,res){  
        const keys = Object.keys(req.body)

        for(key of keys){
                //o mesmo que eu loopar req.body.avatar_url
            if(req.body[key]=="") {
                    return res.send('Please fill all the filds')
            }
        }
     Instructor.create(req.body, function(instructor){
         return res.redirect(`/instructors/${instructor.id}`)
     })

    },
    edit(req,res){
        Instructor.find(req.params.id, function(instructor){
            if(!instructor){res.send('Instructor not Found!!')}
            
            instructor.birth =date(instructor.birth).iso
            

            return res.render('instructors/edit', {instructor})
        })
    },
    put(req,res){
        const keys= Object.keys(req.body)

        for(key of keys){
            if(req.body[key]==''){
                return res.send('Plese, fill all the fields')
            }
        }
        Instructor.update(req.body, function(){
            return res.redirect(`/instructors/${req.body.id}`)
        })
    },
    delete(req,res){
        Instructor.delete(req.body.id, function(){
            return res.redirect(`/instructors`)
        })
        
    },
    
}

