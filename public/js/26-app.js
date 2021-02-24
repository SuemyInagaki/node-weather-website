//const forecast = require('../../src/utils/20-forecast.js/20-forecast.js')
console.log('Client side javascript file is loaded')

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
     response.json().then((data)=>{
        console.log(data)
     })
})

/*
Goal: Fetch weather!

1. Setup a call to fetch weather for Boston
2. Get the parse JSON response
    - If error property, print error
    - If no error property, print location and forecast
3. Refresh the browser and test your work

*/
console.log('Now Im doing the challenge')
const url = 'http://localhost:3000/weather?address=fuji'
fetch(url).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        }
        else{
            //console.log(data.country)
            //console.log(data.temperature)
            console.log(data)
        }
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
//messageOne.textContent = 'From JavaScript'

/*
Goal: Render content to paragraphs

1. Select the second message p from JavaScript
2. Just before fetch, render loading message and empty p
3. If error, render error
4. If no error, render location and forecast
5. Test your work! Search for errors and for valid locations
*/




weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault() //nao deixa atualizar a pagina quando pesquisa
    
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    //const url = 'http://api.weatherstack.com/current?access_key=3c2e705be847070c958a454f16bd2c92&query=' + encoderURIComponent(location)
    const url = 'http://localhost:3000/weather?address=' + encodeURIComponent(location)
    fetch(url).then((response)=>{
        
        response.json().then((data)=>{
            
            if(data.error){
                messageTwo.textContent = data.error
                messageOne.textContent = ''
                console.log(data.error)
            }
            else{
                messageOne.textContent = 'Country: '+ data.country 
                messageTwo.textContent = 'Temperature: '+ data.temperature + 'oC'
                console.log('Country: '+ data.country)
                console.log('Temperature: '+ data.temperature + 'oC')
                
            }
        })
    })
    //console.log(location)
})

/**
 Goal: use input value to get weather

 1. Migrate fetch call into the submit callback
 2. Use the search text as the address query string value
 3. Submit the form with a valid and invalid value to test
 */