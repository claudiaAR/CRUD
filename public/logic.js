let selectedScheme 


window.addEventListener('load', loadPage)

function loadPage() {
    const form = document.getElementById('color-form')
    form.addEventListener('submit', createScheme, 'click')
    document.getElementById("oneSchemeButton").addEventListener("click", getSpecificScheme)
    document.getElementById("deleteButton").addEventListener("click", deleteScheme)
    getAllSchemes() //also used to clear deleted scheme and 
}

function getAllSchemes() {
    fetch("http://localhost:3000/api/color-schemes").then((response) => {
        return response.json()
    }).then((colorData) => {
        printAllSchemes(colorData)
    })
}


function printAllSchemes(colorData) {
    let allColorsContainer = document.getElementById("AllColorSchemes")
    allColorsContainer.innerHTML = "" //rensar tidagere innehåll

    colorData.forEach((scheme) => {
        let colorScheme = document.createElement("h3")
        colorScheme.innerText = scheme.colorScheme
        colorScheme.className = "colorScheme"

        //loops through all hex-values and appends a new div per hex-value
        let colorDiv = document.createElement("div")
        colorDiv.className = "oneScheme"

        scheme.hex.forEach(hex => {
            let hexDiv = document.createElement("div")
            hexDiv.className = "showHex"
            hexDiv.style.backgroundColor = hex
            colorDiv.appendChild(hexDiv)
        });
        
        let id = document.createElement("h3")
        id.innerText = `ID = ${scheme.id}`
        id.className = "idname"

        let creatorName = document.createElement("h3")
        creatorName.innerText = scheme.creatorName
        creatorName.className = "creatorName"

        colorDiv.appendChild(colorScheme)
        colorDiv.appendChild(id)
        colorDiv.appendChild(creatorName)
        allColorsContainer.appendChild(colorDiv)
    });
}


getSpecificScheme = () => {
    let showScheme = document.getElementById("oneScheme")
    let id = document.getElementById("userSchemeInput").value
    fetch("http://localhost:3000/api/color-schemes/" + id).then((response) => {
    
        return response.json()
    }).then((scheme) => {
        selectedScheme = scheme
        console.log(selectedScheme)
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

        let updateButton = document.createElement("button")
        updateButton.innerText = 'Update'
        updateButton.addEventListener('click', printUpdateForm)
        updateButton.className = "action-button-update"

        colorDiv.appendChild(colorScheme)
        colorDiv.appendChild(creatorName)
        showScheme.appendChild(colorDiv)
        colorDiv.appendChild(updateButton)

        //allColorsContainer.appendChild(updateButton)
        
    })
}
//   (allColorsContainer)
printUpdateForm = () => {
    
    let form = document.getElementById("createOrUpdateForm")

    document.getElementById("newScheme").value = selectedScheme.colorScheme
    document.getElementById("hex1Input").value = selectedScheme.hex[0]
    document.getElementById("hex2Input").value = selectedScheme.hex[1]
    document.getElementById("hex3Input").value = selectedScheme.hex[2]
    document.getElementById("hex4Input").value = selectedScheme.hex[3]
    document.getElementById("creatorNameInput").value = selectedScheme.creatorName
    document.getElementById("formSubmit").value = "Update"
    
    form.onsubmit = updateScheme

    console.log(updateScheme)

}

async function updateScheme(event) {
    event.preventDefault()
    event.stopPropagation()

    const formData = new FormData(event.target)
  
    let scheme = {
        //colorScheme: selectedScheme.colorScheme,
        hex: [],
        //creatorName: selectedScheme.creatorName
    }
    for (let pair of formData.entries()) {
        const [key, value] = pair //deconstuction ['colorScheme', 'hello']
        if (key.includes("hex")) {  //if key is hex push it to a array
            scheme.hex.push(value)
          
        } else {
            scheme[key] = value 
        }

        console.log('****HEEEEELPPP*****')
    }

   let schemeObject = document.getElementById("AllColorSchemes")
    scheme.id = selectedScheme.id
    console.log('helooooooooo',schemeNames)

    schemeObject.map(s => s.id !== selectedScheme.id)
  
    await fetch('/api/color-schemes/' + scheme.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(scheme, allColorsContainer)
    }) 
    getAllSchemes()
}

async function createScheme(event) {
    event.stopPropagation()
    event.preventDefault()

    const formData = new FormData(event.target)
    const scheme = {
        hex: []
    }
    for (let pair of formData.entries()) {
        const [key, value] = pair //deconstuction ['colorScheme', 'hello']
        if (key.includes("hex")) {  //if key is hex push it to a array
            scheme.hex.push(value)
        } else {
            scheme[key] = value //pairs id, colorSceme and creatorName 
        }
    }
    await fetch('/api/color-schemes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(scheme)
    }) 
    getAllSchemes()
}

async function deleteScheme() {
    let id = document.getElementById("userSchemeInput").value

    await fetch('/api/color-schemes/' + id, {
        method: 'DELETE'
    })   
    getAllSchemes()
    let showScheme = document.getElementById("oneScheme") 
    showScheme.innerText = ""
}
