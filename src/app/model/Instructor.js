const db = require('../../config/db')


module.exports={
    all(callback){
        db.query(`SELECT * FROM instructors`, function(err,results){
            if(err)return res.send('instructors crashed or not connected!!')
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
        if (err){ return res.send('Database connection Failed in creation!!!')}

       callback (results.rows[0])

    })
    },
    find(id, callback){
    db.query(`SELECT * FROM instructors WHERE id = $1`, [ id ],function(err, results){
        if(err){return res.send('Err at try find by ID: !!')}
        callback(results.rows[0])       

    })

    },
    update(data, callback){
        const query=`
        UPDATE instructors SET
            name= $(1),
            avatar_url= $(2),
            gender= $(3),
            services= $(4),
            birth= $(5)
        WHERE id=$6
        `
        const values=[
            data.name,
            data.avatar_url,
            data.gender,
            data.services,
            data.birth,
            data.id
        ]
    db.query(query,values,function(err,results){
        if (err){res.send('Erro at a moment')}

        callback()
    })

    }
}