const currentPage = window.location.pathname
const menuItems = document.querySelectorAll('header .links a')

for (items of menuItems){
    if(currentPage.includes(items.getAttribute("href"))){
        items.classList.add('active')
    }
}
console.log(currentPage)