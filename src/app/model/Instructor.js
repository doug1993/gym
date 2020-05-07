const db = require('../../config/db')
const {date} = require('../../utils')


module.exports={
    all(callback){
        db.query(`SELECT * FROM instructors`, function(err,results){
            if(err) throw 'instructors crashed or not connected!!'
            callback(results.rows)
        })
    },
    create(data, callback){
        const query=`
        INSERT INTO instructors(
            name,
            avatar_url,
            gender,
            services,
            birth
        ) VALUES ($1,$2,$3,$4,$5)
        RETURNING id
    `
    const values=[
        data.name,
        data.avatar_url,
        data.gender,
        data.services,
        data.birth
    ]
    db.query(query,values, function(err,results){
        if (err) throw 'Database connection Failed in creation!!!'

       callback (results.rows[0])

    })
    },
    find(id, callback){
    db.query(`SELECT * FROM instructors WHERE id = $1`, [ id ], function(err, results){
        if(err) throw  `Err at try find by ID: !!${err}`
        callback(results.rows[0])       

    })

    },
    update(data, callback){
        const query = `
        UPDATE instructors SET
            avatar_url= ($1),
            name= ($2),
            gender= ($3),
            birth= ($4),
            services= ($5)
        WHERE id = $6
        `
        const values=[
            data.avatar_url,
            data.name,
            data.gender,
            data.birth,
            data.services,
            data.id
        ]

        db.query(query, values, function(err, results){
            if (err) throw `${err}` 

            return callback()
        })
    },
    delete(id,callback){
         db.query(`DELETE FROM instructors WHERE id= $1`,[id], function(err, results){
             if(err)throw `Database Delete error ${err} `

             return callback()
         })
    }

}
/*    update(data, callback){
        const query=`
        UPDATE instructors SET
            name= $(1),
            avatar_url= $(2),
            gender= $(3),
            services= $(4),
            birth= $(5),
        WHERE id=$6
        `
        const values=[
            data.name,
            data.avatar_url,
            data.gender,
            data.services,
            data.birth
         
        ]
    db.query(query, values, function(err,results){
        if (err){}

        callback(results.rows[0])
    })

    }*/