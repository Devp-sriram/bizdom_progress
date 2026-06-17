const input = document.getElementById('inputbox')
const paragraph = document.getElementById('display')

const colorInput = document.getElementById('colorbox')
const colorbtn = document.getElementById('colorbtn')
const box = document.getElementById('box')

let color;

input.addEventListener('input', (event)=>{
    paragraph.textContent = event.target.value
});

colorInput.addEventListener('input',(event)=>{
    color = event.target.value
})

colorbtn.addEventListener('click',()=>{
    box.style.backgroundColor = color
})