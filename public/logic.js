fetch("http://localhost:3000/api/color-schemes").then((response) => {
    return response.json() 
}).then((colorData) => {
   
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
    } 
    
    );
}   



getSpecificScheme = () => {
    let showScheme = document.getElementById("oneScheme")
    let id = document.getElementById("userSchemeInput").value 

    fetch("http://localhost:3000/api/color-schemes/" + id).then((response) => {

        return response.json()
    }).then((scheme) => {
        console.log(scheme)
        let colorScheme = document.createElement("h3")
        colorScheme.innerText = scheme.colorScheme
        colorScheme.className = "colorSchemeLightBG"
        
        
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
        creatorName.className = "creatorNameLightBG"
        
        colorDiv.appendChild(colorScheme)
        colorDiv.appendChild(creatorName)
        
        showScheme.appendChild(colorDiv)
    })

}
document.getElementById("oneSchemeButton").addEventListener("click", getSpecificScheme) ;
  
// else{
//     let errorResponse = document.createElement("h4")
//     errorResponse.innerText = 'Sorry cant find the scheme you are looking for'
//     allColorsContainer.appendChild(errorResponse)
// }