const path = require('path')
const express = require( 'express')
const hbs = require('hbs')
const geocode = require('./utils/20-geocode.js')
const forecast = require('./utils/20-forecast.js')



// Goal: Create a partial for the footer 
//
// 1. Setup the template for the footer partial "Created by some name"
// 2. Render the partial at the bottom of all three pages
// 3. Test your work by visiting all three pages
// 


console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

//Esse comando permite que o Heroku retorne um valor para port
// ja que agora nao é mais localhost
const port = process.env.PORT || 3000
//define paths for express config
//Updating views path to use 'templates' instead of views
const viewspath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname, '../public')


const partialsPath = path.join(__dirname, '../templates/partials')
//Setup handlerbars engine and views location
//This line allow us to use handlebars
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve 
app.use(express.static(publicDirectoryPath))


//use render instead of send to use dynamic page(not static)
app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather', 
        name: 'Suemy'
    })
})
// Goal: update weather endpoint to accept adress

// 1. No address? Send back an error message
// 2. Address? Send back the static JSON
//     - Add address property onto JSON which returns the provided address
// 3. Test /weather and /weather?address=philadelphia

app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            error: 'Error! Please, add an address'
        })
    }
    else{
        geocode(req.query.address, (error, data = {}) =>{
            if(error){
                res.send({error})
            }
            else{
                forecast(req.query.address, (error, data = {})=>{
                    if(error){
                        res.send({error})
                    }
                    else{
                        const {country, latitude, longitude, temperature, precip} = data
                        res.send({
                            country, latitude, longitude, temperature, precip
                        })
                    }
                })
            }
        })

        /*res.send({
            forecast: 'It is snowing',
            location: req.query.address
        })*/
    }
    
})


// Goal: wire up /weather

// 1. Require geocode/forecast into app.js
// 2. Use the address to geocode
// 3. Use the coordinates to get forecast
// 4. Send back the real forecast and location



app.get('/products', (req, res)=>{
    if(!req.query.search){
        res.send({
            error: 'You must provide a search term'
        })
    }
    else{
        console.log(req.query.search)
        res.send({
            products: []
        })
    }
   
})



app.get('/about', (req, res)=> {
    res.render('about',{
        title: 'About me',
        name: 'Suemy'
    })
})


app.get('', (req, res)=>{
    res.send('Hello express')
})
/*
app.get('/help', (req, res) =>{
    res.send({
        name: 'Suemy',
        age: 22
    })
})*/

/*
Goal: Create two more HTML pages

1. Create a html page for about with "About" title
2. Create a html page for help with "Help" title
3. Remove the old route handlers for both
4. Visit both in the browser to test your work
*/


//app.com
//app.com/help
//app.com/about
//app.com/others



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
/*
app.get('/about', (req, res)=>{
    res.send('<h1>About page</h1>')
})

app.get('/weather', (req, res)=>{
    res.send({
        forecast: 'It is raining'
    })
})*/


/*
Goal: Create a template for help page

1. Setup a help template to render a help message to the screen
2. Setup the help route and render the template with an example message
3. Visit the route in the browser and see your help message print

*/

app.get('/help', (req, res)=> {
    res.render('help', {
        title: 'Help',
        message: 'Do you need help?',
        name: 'Suemy'
    })
})

//to compile the file when you are using partials, you need to add -e at the end of
//the line and than add a list of extentios of files..
/*
nodemon src/25-app.js -e js,hbs
*/

app.get('/help/*', (req, res)=>{
    res.render('error', {
        error: 'Help arcticle not found'
    })
})

app.get('*', (req, res)=>{
    res.render('error', {
        error: 'Error 404: Page not Found'
    })
})


// Goal: Create and render a 404 page with handlebars

// 1. Setup the template to render the header and footer
// 2. Setup the template to render an error message in a paragraph
// 3. Render the template for both 404 routes. 
//     - Page not found
//     - Help arcticle not found
// 4. Test your work. Visit /what and /help/units


/*
//para acessar: localhost:3000
app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})
*/

app.listen(port, ()=>{
    console.log('Server is up on port'+ port)
})
