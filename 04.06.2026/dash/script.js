const table = document.querySelector('table');

const data = [{
    id:1,
    customer:"Vikram",
    location:"kerla",
    orderDate:"09/06/026",
    status:'delivered',
    amount:300
},
{
    id:1,
    customer:"Vikram",
    location:"kerla",
    orderDate:"09/06/026",
    status:'delivered',
    amount:300
}]


for(let item of data){
    const row = document.createElement('tr');
    row.innerHTML = ` <td>${item.id}</td>
            <td>${item.customer}</td>
            <td>${item.location}</td>
            <td>${item.orderDate}</td>
            <td>${item.status}</td>
            <td>${item.amount}</td>`
    table.appendChild(row);
}
