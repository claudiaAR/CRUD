const express = require('express')
const app = express()
app.use(express.json())
// let colorData = require('./colorData')
const fs = require('fs')




//.statics tar in sökvägen till mappen public
app.use(express.static('public'))

// //Index page 
// app.get ( '/' ,(req, res) => {
//     res.send('Hello world!!!')
// })

//goes to page color-scheme and renders the array
//this returns the colorData[]
app.get( '/api/color-schemes', (req, res) => {
    let data = fs.readFileSync('./colorData.json')
    let colorData = JSON.parse(data)
    res.send(colorData)
})

//a path with a defind parameter :id
app.get( '/api/color-schemes/:id', (req, res) => {
    console.log(req.params.id)
    let data = fs.readFileSync('./colorData.json')
    let colorData = JSON.parse(data)
    const scheme = colorData.find(c => c.id == req.params.id)
     if (!scheme) res.status(404).send('This page is not found: status 404')
    res.send(JSON.stringify(scheme))
    console.log(scheme)
})

let randomizeIdNumber = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

//its like sending in props from colorData array
app.post('/api/color-schemes', (req, res) => {
    let data = fs.readFileSync('./colorData.json')
    let colorData = JSON.parse(data)
    
    //ToDo make it validate to expected # and 6carecters
    if(!req.body.hex || req.body.hex < 7) {
        res.status(400).send('you have to use a hex value #11AB22 numbers 0-9 and A-F starting witha # ')
        if (!scheme) res.status(404).send('Oh no, this color color scheme does not excist')
        return
    }

    // let newColor = req.body
    // newColor.id = randomizeIdNumber()
    const scheme = {
            id: randomizeIdNumber(),
            colorScheme: req.body.colorScheme,
            hex: req.body.hex,
            creatorName: req.body.creatorName
        }

        colorData.push(scheme)
        res.send(scheme)
        fs.writeFileSync('colorData.json', JSON.stringify(colorData, null, 2));
        
})

app.put('/api/color-schemes/:id', (req,res) => {
    let data = fs.readFileSync('./colorData.json')
    let colorData = JSON.parse(data)
    const updatedScheme = colorData.find(c => c.id == req.params.id)
     if (!updatedScheme) {
        res.status(404).send('This page is not found: status 404')
        return
    }
    //ToDo validate

    updatedScheme.colorScheme = req.body.colorScheme
    updatedScheme.creatorName = req.body.creatorName

    colorData = colorData.map( (scheme) => { 
        if (scheme.id === req.params.id) {
            return updatedScheme
        }
        return scheme
    })
    console.log(colorData)
    res.send(updatedScheme)
    fs.writeFileSync('colorData.json', JSON.stringify(colorData, null, 2));
})


app.delete('/api/color-schemes/:id', (req,res) => {
    let data = fs.readFileSync('./colorData.json')
    let colorData = JSON.parse(data)
    const scheme = colorData.find(c => c.id === req.params.id)
    if (!scheme) {
       res.status(404).send('This page is not found: status 404')
       return
   }
     //ToDo validate
   const index = colorData.indexOf(scheme)
   colorData.splice(index, 1)

    res.send(scheme)
    fs.writeFileSync('colorData.json', JSON.stringify(colorData, null, 2));
})


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listend on port ${port}...`))
