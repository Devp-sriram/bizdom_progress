const form = document.getElementById('container')
const table = document.getElementById('table')
const toggleTable = document.getElementById('toggle-table')
const toggleForm = document.getElementById('toggle-form')
const wrapper = document.querySelector('.wrapper')

const clearbtn = document.getElementById('clear');
const submitbtn = document.getElementById('submit')
const resetbtn = document.getElementById('reset');
const updatebtn = document.getElementById('update')

const errorList = document.querySelectorAll('.error')
const username = document.getElementById('username')

const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || ""
function logout() {
    localStorage.removeItem('loggedInUser')
    redirect()
}
function redirect() {
    window.location.href = '/login.html'
}



if (!loggedInUser) {
    redirect()
} else {
    username.textContent = loggedInUser.name
}



let tableData = JSON.parse(localStorage.getItem('data')) || []
render()
let editId;
function generateuuid() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

function redirectTotable() {
    wrapper.style.display = 'block';
    form.style.display = 'none';
    toggleForm.style.display = 'block'
    toggleTable.style.display = 'none'
}

function RedirectToForm() {
    wrapper.style.display = 'none';
    form.style.display = 'flex';
    toggleTable.style.display = 'block'
    toggleForm.style.display = 'none'
}

function EnterEditState(id) {
    editId = id
    clearbtn.style.display = 'none'
    submitbtn.style.display = 'none'

    resetbtn.style.display = 'block'
    updatebtn.style.display = 'block'
}
function ExitEditState() {
    editId = ""
    clearbtn.style.display = 'block'
    submitbtn.style.display = 'block'

    resetbtn.style.display = 'none'
    updatebtn.style.display = 'none'
}
updatebtn.addEventListener('click', () => {
    const formData = new FormData(form)
    console.log(Object.fromEntries(formData.entries()));
    console.log(editId)
    updatedata(editId, Object.fromEntries(formData.entries()))
    redirectTotable()
    ExitEditState()
})

resetbtn.addEventListener('click', () => {
    reset(editId)
})

toggleTable.addEventListener('click', () => {
    redirectTotable()
})

toggleForm.addEventListener('click', () => {
    RedirectToForm()
})

function render() {
    let trArray = []
    for (data of tableData) {
        let row = document.createElement('tr')
        row.innerHTML = `<td>${data.name}</td> 
                     <td>${data.amount}</td>
                     <td>${data.method}</td>
                     <td>${data.status}</td>
                     <td>
                        <button class='edit' onclick=editData(${data.id}) >
                            <svg width="12px" height="12px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path
                                        d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z" />
                                </g>
                            </svg>
                            Edit
                        </button>
                        <button class='del' onclick=deleteData(${data.id}) >Delete</button>
                     </td>`

        trArray.push(row)
    }
    table.innerHTML = ` <tr class="table-head">
                <td>Reciptent Name</td>
                <td>Amount</td>
                <td>Payment Method</td>
                <td>Payment Status</td>
                <td>Action</td>
            </tr>`
    trArray.forEach(elem => table.appendChild(elem))
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries());
    data.id = generateuuid()

   if (!validate(data)) {
       
    } else {
        tableData.unshift(data)
        localStorage.setItem('data', JSON.stringify(tableData));
        clear()
        resetValidationErrros()
        redirectTotable()
        render()

    }
})

function validate(data) {
    let legit = true
    for (let feild in data) {
        if (data[feild] === "") {
            legit = false
            for (err of errorList) {
                if (err.id == feild) {
                    err.style.display = 'block'
                }
            }
        }
    }
    return legit
}

function resetValidationErrros(){
    for (err of errorList) {
        err.style.display = 'none'
    }
}

function clear() {
    const allInputs = [...form.elements].filter(elem => elem.localName == 'input')
    allInputs.forEach(inp => inp.value = "")
}

function deleteData(id) {
    tableData = tableData.filter(data => data.id !== String(id))
    localStorage.setItem('data', JSON.stringify(tableData))
    render()
}

function reset(id) {
    const doc = tableData.find(data => data.id === String(id))
    const allInputs = [...form.elements].filter(elem => elem.localName == 'input')
    const allselects = [...form.elements].filter(elem => elem.localName == 'select')
    for (feild in doc) {
        allInputs.forEach(inp => inp.name === feild ? inp.value = doc[feild] : "");
        allselects.forEach(select => select.name === feild ? select.value = doc[feild] : "")
    }
}
function editData(id) {
    EnterEditState(id)
    RedirectToForm()
    reset(id)
}

function updatedata(id, updatedData) {
    const index = tableData.findIndex(data => data.id === String(id));

    if (index !== -1) {
        tableData[index] = { ...tableData[index], ...updatedData };
    }
    console.log(tableData[0])
    localStorage.setItem('data', JSON.stringify(tableData))
    render()
}