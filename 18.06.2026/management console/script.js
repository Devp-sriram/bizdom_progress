const navList = document.querySelectorAll('ul li a')
const frame = document.querySelector("iframe")
navList.forEach(a =>{
    a.addEventListener('click',()=>{
        navList.forEach(a=> a.classList.remove('active'))
        a.classList.add('active')
    })
    a.addEventListener('click',()=>{
        console.log(a.textContent)
        if(a.textContent.trim() === 'Orders'){
            frame.src = './table.html'
        }else{
            frame.src = './form.html'
        }
    })
})