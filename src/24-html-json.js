const express = require( 'express')
const app = express()

app.get('', (req, res)=>{
    res.send('Hello express')
})

app.get('/help', (req, res) =>{
    res.send({
        name: 'Suemy',
        age: 22
    })
})


//app.com
//app.com/help
//app.com/about
//app.com/others

//para acessar: localhost:3000
app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})


/*
    Goal: Setup two new routes

    1. Setup an about route and render a page title
    2. Setup a weather route and render a page title
    3. Test your work by visiting both in the browser

*/





/*
  Goal: Update routes

  1. Setup about route to render a title with HTML
  2. Setup a weather route to send back JSON
    - Object with forecast and location strings
  3. Test your work by visiting both in the browser

*/

app.get('/about', (req, res)=>{
    res.send('<h1>About page</h1>')
})

app.get('/weather', (req, res)=>{
    res.send({
        forecast: 'It is raining'
    })
})