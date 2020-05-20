const currentPage = window.location.pathname

const menuItems = document.querySelectorAll('header .links a')

for (items of menuItems){
    if(currentPage.includes(items.getAttribute("href"))){
        items.classList.add('active')
    }
}


function paginate (selectedPage, totalPages){
    
    let /*selectedPage= 15, totalPages =30,*/
        pages =[],
        oldPage
        a=selectedPage
        b=totalPages

    for (let currentPage = 1; currentPage <= totalPages; currentPage++){

        const firstAndLastPage = currentPage == 1 ||currentPage == totalPages
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currentPage >=selectedPage - 2
       
    
        if(firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage){
            if (oldPage && currentPage - oldPage > 2){
    
                pages.push('...')
              
            }
    
            if (oldPage && currentPage - oldPage == 2){
    
                pages.push(oldPage + 1)
              
            }
            pages.push(currentPage)
             
            oldPage = currentPage
    
        } 
        
    }

    let elements=""
    for (let page of pages){
        if(String(page).includes("...")){
            elements +=`<span>${page}</span>`
        }
        else{
            
            if(filter){
                elements+= `<a href="?page=${page}&filter=${filter}">${page}</a>`
            }
            else{
                elements+= `<a href="?page=${page}">${page}</a>`
            }
        }
    }
    

    console.log(pages)
    pagination.innerHTML = elements 
    console.log(pagination)
}

    const pagination = document.querySelector('.pagination') 
    const filter = pagination.dataset.filter
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total
    const pages = paginate(page, total)
    



