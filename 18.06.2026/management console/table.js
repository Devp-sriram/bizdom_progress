const body = document.getElementById('tbody')
const search = document.getElementById('search')
const advanceSearch = document.getElementById('advSearch')
const clear = document.getElementById('clear')

const advSearchmap = {}

let selectedId;
let isAdvSearchOpen = false
const employees = []
let filteredEmp = employees



const myModal = document.getElementById('exampleModal');

myModal.addEventListener('show.bs.modal', function (event) {

    const button = event.relatedTarget;
    const name = button.getAttribute('data-bs-name');
    const age = button.getAttribute('data-bs-age');
    const email = button.getAttribute('data-bs-email');
    selectedId = button.getAttribute('data-bs-id');

    // Update the modal's content
    const modalNameContainer = myModal.querySelectorAll('#modalName');
    const modalAgeContainer = myModal.querySelector('#modalAge');
    const modalEmailContainer = myModal.querySelector('#modalEmail');
    modalNameContainer.forEach(model => model.textContent = name)
    // modalAgeContainer.textContent = age;
    // modalEmailContainer.textContent = email
});

function toggleSearch() {
    if (!isAdvSearchOpen) {
        advanceSearch.style.display = 'flex'
        isAdvSearchOpen = true
    } else {
        advanceSearch.style.display = 'none'
        isAdvSearchOpen = false
    }
}

function reset() {
    const inputs = advanceSearch.querySelectorAll('input')
    inputs.forEach(input => input.value = '')
    filteredEmp = employees
    render()
}

function markRed() {
    const row = document.getElementById(`row-${selectedId}`)
    const cols = row.querySelectorAll('td')

    for (let i = 0; i < 9; i++) {
        cols[i].style.backgroundColor = "red"
        cols[i].style.color = 'white'
    }
}

// clear.addEventListener('click', () => {
//     search.value = ''
//     filteredEmp = employees
//     render()
// })

search.addEventListener('input', (e) => {
    const serachText = e.target.value.toLowerCase()

    filteredEmp = employees.filter(emp => {
        const regex = new RegExp(serachText, 'i')
        return regex.test(emp.name.toLowerCase()) ||
            regex.test(emp.age.toString()) ||
            regex.test(emp.email.toLowerCase()) ||
            regex.test(emp.phone.toLowerCase()) ||
            regex.test(emp.department.toLowerCase()) ||
            regex.test(emp.salary.toLocaleString()) ||
            regex.test(emp.city.toLowerCase()) ||
            regex.test(emp.state.toLowerCase())
    })
    render()
})
advanceSearch.addEventListener("input", (e) => {
    advSearchmap[e.target.name] = e.target.value.toLowerCase()
})

advSearchSubmit.addEventListener('click', () => {

    filteredEmp = employees.filter(emp => {
        const nameMatch = !advSearchmap.name | new RegExp(advSearchmap.name, 'i').test(emp.name.toLowerCase());
        const emailMatch = !advSearchmap.email | new RegExp(advSearchmap.email, 'i').test(emp.email.toLowerCase());
        const depMatch = !advSearchmap.department | new RegExp(advSearchmap.department, 'i').test(emp.department.toLowerCase());
        const city = !advSearchmap.city | new RegExp(advSearchmap.city, 'i').test(emp.city.toLowerCase());

        return nameMatch && emailMatch && depMatch && city
        // return advSearchmap.name ? new RegExp(advSearchmap.name, 'i').test(emp.name.toLowerCase()) :"" ||
        //        advSearchmap.email ? new RegExp(advSearchmap.email, 'i').test(emp.email.toLowerCase()) : "" ||
        //        advSearchmap.department ? advSearchmap.department === emp.department.toLowerCase():"" ||
        //        advSearchmap.city ? advSearchmap.city === emp.city.toLowerCase() : ""
    })
    render()
})

render()

function render() {
    body.innerHTML = ''
    filteredEmp.forEach(employee => {
        let tr = document.createElement('tr')
        tr.innerHTML = `
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.age}</td>
                <td>${employee.email}</td>
                <td>${employee.phone}</td>
                <td>${employee.department}</td>
                <td>${employee.salary.toLocaleString()}</td>
                <td>${employee.city}</td>
                <td>${employee.state}</td>
                <td>${employee.status === "Active" ? "<button id='active-btn'class='btn btn-success'>Active</button>" : "<button id='active-btn'class='btn btn-danger'>Inactive</button>"}</td>
                <td>
                    <i class="px-2 fa-solid fa-pen-to-square" style="color: rgb(255, 212, 59);"></i>
                   <button id='delete' data-bs-toggle="modal" data-bs-target="#exampleModal"
                     data-bs-id="${employee.id}" data-bs-name = "${employee.name}" data-bs-age="${employee.age}" data-bs-email="${employee.email}" 
                   >
                    <i class="px-2 fa-solid fa-trash" style="color: rgb(255, 0, 0);"></i>
                   </button>
                </td>
            `
        tr.id = `row-${employee.id}`
        body.appendChild(tr)
    })
}