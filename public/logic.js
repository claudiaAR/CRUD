fetch("http://localhost:3000/api/color-schemes").then((response) => {
    return response.json()
}).then((colorData) => {
    console.log(colorData)
    printAllSchemes(colorData)
})

function printAllSchemes(colorData) {
    let allColorsContainer = document.getElementById("AllColorSchemes")
    
    colorData.forEach((scheme) => { 
        let colorScheme = document.createElement("h3")
        colorScheme.innerText = scheme.colorScheme
        colorScheme.className = "colorScheme"
        
        
        //loops through all hex-values and appends a new div per hex-value
        let colorDiv = document.createElement("div")
        scheme.hex.forEach(hex => {
            let hexDiv = document.createElement("div")
            hexDiv.className = "showHex"
            hexDiv.style.backgroundColor = hex
            colorDiv.appendChild(hexDiv)
        });
       

        let creatorName = document.createElement("h3")
        creatorName.innerText = scheme.creatorName
        creatorName.className = "creatorName"
        
        colorDiv.appendChild(colorScheme)
        colorDiv.appendChild(creatorName)
        
        allColorsContainer.appendChild(colorDiv)
        
    });
}
              