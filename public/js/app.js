
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const Message1= document.querySelector('#Message-1')
const Message2= document.querySelector('#Message-2')



weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()

    const location = search.value
    Message1.textContent = 'Loading....!'

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        //Message1.textContent = ''
        if(data.error){
            Message1.textContent =data.error
        }
        else{
        Message1.textContent ='Location is '+location
        Message2.textContent ='temperature is '+data.temperature
        }
    })
})
})