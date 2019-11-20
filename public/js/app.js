console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const weatherSearch = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    // prevent default form behavior, which is to refresh page
    e.preventDefault()
    const inputValue = weatherSearch.value
    messageOne.textContent = `Just a sec, Boss`
    messageTwo.textContent = ''
    // console.log(weatherSearch)
    fetch(`/weather?address=${inputValue}`)
    .then((response) => {
        // debugger
        response.json()
        .then((data) => {
            console.log(data.Error)
            if(data.Error) {
                console.log('hit error')
                return messageOne.textContent = data.Error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = `${data.forecastData.currTemp} degrees, currently and ${data.forecastData.summary}`
            }
  
        })
    })
})