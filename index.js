const express = require('express')
const app = express()
import colorData from './colorData'


//Index page 
app.get ( '/' ,(req, res) => {
    res.send('Hello world!!!')
})

//goes to page color-scheme and renders the array
//this returns the colorData[]
app.get( '/api/color-scheme', (req, res) => {
    res.send(colorData)
})

//a path with a defind parameter :id
app.get( '/api/color-scheme/:id', (req, res) => {
   // res.send("id" + req.params.id);
    const scheme = colorData.find(c => c.id === req.params.id)
     if (!scheme) res.status(404).send('This page is not found: status 404')
     res.send(scheme)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listend on port ${port}...`))