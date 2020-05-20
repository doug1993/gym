const {age , date}= require('../../utils')
Member =require('../model/member')

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
            callback(members){
                const pagination ={
                    total: Math.ceil(members[0].total / limit),
                    page
                }

                return  res.render("members/index", { members, pagination, filter  })

            }
        }

        Member.paginate(params)
    },
     show(req,res){
         Member.find(req.params.id, function(member){
             if(!member){res.send('Member not Found!!')}
             member.age = age(member.birth)
             member.since = date(member.created_at)
 
             return res.render('members/show', {member})
         })
     },
     create(req,res){

        Member.instructorsSelectOptions(function(options){
            return res.render('members/create')
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
      Member.create(req.body, function(member){
          return res.redirect(`/members/${member.id}`)
      })
 
     },
     edit(req,res){
         Member.find(req.params.id, function(member){
             if(!member){res.send('Member not Found!!')}
             
             member.birth = date(member.birth)
             
 
             Member.instructorsSelectOptions(function(options){
                return res.render('members/edit', {member, instructorOptions:options})
         })
        })
     },
     put(req,res){
         const keys= Object.keys(req.body)
 
         for(key of keys){
             if(req.body[key]==''){
                 return res.send('Plese, fill all the fields')
             }
         }
 
         Member.update(req.body, function(){
             return res.redirect(`/members/${req.body.id}`)
         })
     },
     delete(req,res){
         Member.delete(req.body.id, function(){
             return res.redirect(`/members`)
         })
         
     },
     
 }