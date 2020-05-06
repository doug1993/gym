const today = new Date()
module.exports = {
    age: function(time){
    
    const birthDate = new Date(time)

    age = today.getFullYear() - birthDate.getFullYear()
    month = today.getMonth() - birthDate.getMonth()
    if (month<0||month==0 && today.getDate()<=birthDate.getDate()){
        age=age-1
        }
        return age
    },
    date: function(time){
        const date = new Date(time)
        const birthDate = new Date(time)

        year = birthDate.getUTCFullYear()
        month = `0${birthDate.getUTCMonth()+1}`.slice(-2)
        day = `0${birthDate.getUTCDate()}`.slice(-2)
        
        return `${year}-${month}-${day}`
       
    }
}


/*
    */