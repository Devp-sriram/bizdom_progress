const form = document.querySelector('form');
const name = document.getElementById('name')

const formData = JSON.parse(localStorage.getItem('formData')) || "";

const allInputs = [...form.elements].filter(elem=> elem.localName == 'input')

if(formData !== ""){
    console.log('--------- presistent data-----------');
    for(data in formData){
        allInputs.forEach( inp => inp.attributes.name.value === data ? inp.attributes.type.value === 'radio' && inp.value === formData[data] ? inp.checked = true : inp.value = formData[data]: "")
    }
}
form.addEventListener('submit',(event)=>{
    // console.log(formData.get("name"))
    event.preventDefault()
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries())
    console.log(data)
    localStorage.setItem('formData', JSON.stringify(data))
})