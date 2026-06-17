const navItems = document.querySelectorAll('.nav-button');
const body = document.querySelector('body');
 navItems.forEach(item=> item.addEventListener('click',()=>{
    navItems.forEach(nav=> nav.classList.remove('active'))
    item.classList.add('active')
 }))