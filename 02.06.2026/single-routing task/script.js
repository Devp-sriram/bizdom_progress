const home = document.getElementById('home')
const about = document.getElementById('about')
const contact = document.getElementById('contact')

const pageArr = [home,about,contact]

function navto(page){
    // console.log('page'+page)
    pageArr.forEach(elem => elem === page ? elem.style.display = 'block' : elem.style.display = 'none' )
}