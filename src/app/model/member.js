const db = require('../../config/db')



module.exports={
    all(callback){
        db.query(`SELECT * FROM members`, function(err,results){
            if(err) throw 'members crashed or not connected!!'
            callback(results.rows)
        })
    },
    create(data, callback){
        const query=`
        INSERT INTO members(
            name,
            avatar_url,
            gender,
            birth,
            created_at,
            member_id
        ) VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING id
    `
    const values=[
        data.name,
        data.avatar_url,
        data.gender,
        data.birth,
        data.created_at = new Date(),
        data.member
    ]
    db.query(query,values, function(err,results){
        if (err) throw 'Database connection Failed in creation!!!'

       callback (results.rows[0])

    })
    },
    find(id, callback){
    
    db.query(`SELECT * FROM members WHERE id = $1`, [ id ], function(err, results){
        if(err) throw  `Err at try find by ID: !!${err}`
        callback(results.rows[0])       
  

    })

    },
    findyBy(){
        db.query(`
        SELECT members.*
        FROM members
        WHERE members.name ILIKE '%${filter}%'  
        `, function(err, results){
            if(err) throw `Filter Error ! ${err}`

            callback(results.rows)
        })
        
    },
    update(data, callback){
        const query = `
        UPDATE members SET
            avatar_url= ($1),
            name= ($2),
            gender= ($3),
            birth= ($4),
            member_id = ($5)
        WHERE id = $6
        `
        const values=[
            data.avatar_url,
            data.name,
            data.gender,
            data.birth,
            data.member,
            data.id
        ]

        db.query(query, values, function(err, results){
            if (err) throw `${err}` 

            return callback()
        })
    },
    delete(id,callback){
         db.query(`DELETE FROM members WHERE id= $1`,[id], function(err, results){
             if(err)throw `Database Delete error ${err} `

             return callback()
         })
    },
    membersSelectOptions(callback){
        db.query(`SELECT name,id FROM members `, function(err, results){
            if (err) throw 'Impossible to select members!!!'

            callback(results.rows)  
        })
    },
    paginate(params){
        const { filter, limit, offset, callback} = params

            let query ="",
                filterQuery="",
                totalQuery=`(SELECT count(*) FROM members ) AS total`

        if (filter){
            filterQuery = `
            WHERE members.name ILIKE '%${filter}%'
            
            `   
            totalQuery =`(
                SELECT count(*) FROM members
                ${filterQuery}
            ) AS total` 
        }

         query = `SELECT members.*,
        ${totalQuery}
         FROM members
    
        ${filterQuery}
        LIMIT $1 OFFSET $2` 

        db.query(query,[limit ,offset], function(err, results){
            if(err) throw 'Paginate ERROR!!'
 
            callback(results.rows)
        })
    }

}
