const input = document.getElementById('input')
const generateButton = document.getElementById('genbtn')
const clearButton = document.getElementById('clrbtn')

const container = document.getElementById('container')

let count = 0;

input.addEventListener('input',(event) => {
    count = parseInt(event.target.value)
})

generateButton.addEventListener('click',()=>{
    generate(count)
})

clearButton.addEventListener('click',()=>{
    clear()
})

function generate(count){
    for(let i=1; i<=count;i++){
        const input = document.createElement('input')
        input.type = 'text'
        input.placeholder = `input ${i}`
        container.appendChild(input)
    }
}

function clear(){
    container.innerHTML = ""
    input.value = ""
    count = 0
}

