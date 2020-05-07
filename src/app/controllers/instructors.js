
const Instructor = require('../model/Instructor')
const {age, date}= require('../../utils')

//Here I show how to do exportation of a faster manner 
    
module.exports = {
   // Call for short hand object properties*/
    index(req,res){
        Instructor.all(function(instructors){
            return res.render('instructors/index', {instructors})
        })
      
    },
    show(req,res){
        Instructor.find(req.params.id, function(instructor){
            if(!instructor){res.send('Instructor not Found!!')}
            instructor.age = age(instructor.birth)
            instructor.created_at = date(instructor.created_at).format

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
    a = console.log('test ')
}

/*Here is the slower form to call function 
exports.index = function(req,res){
    return res.render('instructors/index', {instructors: data.instructors})
}
                //-->-->SHOW<--<--
exports.show = function(req,res){
    //params so o  padrao apos a barra instructors no url 
    const {id} = req.params
    
    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })    
    if(!foundInstructor){return res.send('Instructor not Found')}

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        since: new Intl.DateTimeFormat('en-US').format(foundInstructor.created_at),
        //birth: new Intl.DateTimeFormat('en-US').format(foundInstructor.birth)
    }

    return res.render('instructors/show', {instructor})
}
                //-->-->CREATE<--<--
exports.post = function(req,res){ 
    //pega apenas os nomes dos campos 
    const keys = Object.keys(req.body)

    for(key of keys){
        //o mesmo que eu loopar req.body.avatar_url
       if(req.body[key]=="") {
            return res.send('Please fill all the filds')
       }
    }
            req.body.created_at = Date.now()
            req.body.id = Number(data.instructors.length + 1) 
            let {id,name,avatar_url,services,gender,birth, created_at} = req.body
         
    data.instructors.push({
            id,
            name,
            avatar_url,
            services,
            gender,
            birth,
            created_at,
         } )
    //save data of frontend in data base 
    fs.writeFile('data.json',JSON.stringify(data,null,2), function(err){
        if (err){return res.send('Error at create file')} 
    
        return res.redirect('/instructors/create')
        
    })
    
}

exports.edit =  function(req,res){
     //params so o  padrao apos a barra instructors no url 
    const {id} = req.params
    
    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })    
    if(!foundInstructor){return res.send('Instructor not Found')}
        const instructor={
            ...foundInstructor,
            birth: date(foundInstructor.birth)
           
        }


    return res.render('instructors/edit',{ instructor })
 }
exports.put = function(req,res){
    const {id} = req.body
    let index = 0
    
    const foundInstructor = data.instructors.find(function(instructor,foundIndex){
        if (id==instructor.id){
            index = foundIndex
            return true
            
        }
        //return instructor.id == id
    })    
    if(!foundInstructor){return res.send('Instructor not Found')}

    const instructor ={
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id : Number(req.body.id)
    }

    data.instructors[index] = instructor
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('ERROR !!')

        return res.redirect(`/instructors/${id}`)
    })
}
exports.delete = function(req,res){
    const {id} = req.body

    const filteredInstructors = data.instructors.filter(function(instructor){
        if (id!=instructor.id){
            return true 
        }
    })
    data.instructors = filteredInstructors
    fs.writeFile('data.json', JSON.stringify(data,null,2), function(err){
        if(err){return res.send('Write ERROR!!!')}

        return res.redirect('/instructors')
    })
    
}*/
