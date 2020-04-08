const express = require('express')
const app = express()
app.use(express.json())
// import {colorData} from './colorData.js'

const colorData = [
    {
        id: '1',
        colorScheme: 'Summer blur',
        hex: ['#2B886d', '#fbe894', '#fcfaf1', '#71dbd4'],
        creatorName: 'pulp agency'
    },
    {
        id: '2',
        colorScheme: 'midnight',
        hex: ['#2B886d', '#fbe894', '#fcfaf1', '#71dbd4'],
        creatorName: 'pulp agency'
    },
    {
        id: '3',
        colorScheme: 'beach delight',
        hex: ['#2B886d', '#fbe894', '#fcfaf1', '#71dbd4'],
        creatorName: 'pulp agency'
    },
    {
        id: '4',
        colorScheme: 'garden green',
        hex: ['#2B886d', '#fbe894', '#fcfaf1', '#71dbd4'],
        creatorName: 'pulp agency'
    },
    
    {
        id: '5',
        colorScheme: 'Summer blur',
        hex: ['#2B886d', '#fbe894', '#fcfaf1', '#71dbd4'],
        creatorName: 'pulp agency'
    }
]

//Index page 
app.get ( '/' ,(req, res) => {
    res.send('Hello world!!!')
})

//goes to page color-scheme and renders the array
//this returns the colorData[]
app.get( '/api/color-schemes', (req, res) => {
    res.send(colorData)
})

//a path with a defind parameter :id
app.get( '/api/color-schemes/:id', (req, res) => {
    const scheme = colorData.find(c => c.id === req.params.id)
     if (!scheme) res.status(404).send('This page is not found: status 404')
     res.send(scheme)
})

let randomizeIdNumber = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
  }

//its like sending in props from colorData array
app.post('/api/color-schemes', (req, res) => {
    //ToDo make it validate to expected # and 6carecters
    if(!req.body.hex || req.body.hex < 7) {
        res.status(400).send('you have to use a hex value #11AB22 numbers 0-9 and A-F starting witha # ')
        if (!scheme) res.status(404).send('Oh no, this color color schema does not excist')
        return
    }
    const scheme = {
            id: randomizeIdNumber(),
            colorScheme: req.body.colorScheme,
            hex: req.body.hex,
            creatorName: req.body.creatorName
        }

        colorData.push(scheme)
        res.send(scheme)
})

app.put('/api/color-schemes/:id', (req,res) => {
    const scheme = colorData.find(c => c.id === req.params.id)
     if (!scheme) {
        res.status(404).send('This page is not found: status 404')
        return
    }
    //ToDo validate
    scheme.colorScheme = req.body.colorScheme
    res.send(scheme)
})


app.delete('/api/color-schemes/:id', (req,res) => {
    const scheme = colorData.find(c => c.id === req.params.id)
    if (!scheme) {
       res.status(404).send('This page is not found: status 404')
       return
   }
     //ToDo validate
   const index = colorData.indexOf.scheme
   colorData.splice(index, 1)

    res.send(scheme)
})


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listend on port ${port}...`))
