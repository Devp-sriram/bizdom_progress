const buttons = document.querySelectorAll('tfoot button');
const tableBody = document.querySelector('tbody');

const BASE_URL = 'https://dummyjson.com/products?select=title,brand,price,category,images'

const localCache = new Map()

let tableData = []
fetchData().then(res=> tableData = res.products).then(()=>render()).then(()=> localCache.set(`&skip=0&limit=10` , tableData ))


buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.toggle('active');

        if(localCache.has(`&skip=${Number(button.textContent)*10}&limit=${Number(button.textContent)*10+10}`)){
            tableData = localCache.get(`&skip=${Number(button.textContent)*10}&limit=${Number(button.textContent)*10+10}`)
            render()
            console.log('cached data')
        }else{
            fetchData(Number(button.textContent)*10 , 10).then(res=> tableData = res.products)
            localCache.set(`&skip=${Number(button.textContent)*10}&limit=${Number(button.textContent)*10+10}` , tableData )
            console.log(localCache)
            render()
        }
    });
})

function render(){
    tableBody.innerHTML = "";

    tableData.forEach(data=>{
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${data.title}</td>
            <td><img src='${data.images[0]}' alt='${data.title}' width='150px' height='150px'/></td>
            <td>${data.brand}</td>
            <td>$ ${data.price}</td>
            <td>${data.category}</td>
        `
        tableBody.appendChild(tr)
    })
}

function fetchData(skip=0,limit=10) {
   return fetch(`${BASE_URL}&skip=${skip}&limit=${limit}`).then(res => res.json())
}
