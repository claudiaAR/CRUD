window.addEventListener('load', loadPage)


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
        console.log(scheme)
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
    console.log(showScheme)
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
document.getElementById("oneSchemeButton").addEventListener("click", getSpecificScheme);



function loadPage() {
    const form = document.getElementById('color-form')
    form.addEventListener('submit', creatScheme)
}

function creatScheme(event) {
    event.stopPropagation()
    event.preventDefault()

    const formData = new FormData(event.target)
    const scheme = {
        hex: []
    }
    for (let pair of formData.entries()) {
        //deconstuction ['colorScheme', 'hello']
        const [key, value] = pair
        if (key.includes("hex")) {
            scheme.hex.push(value)
        } else {
            scheme[key] = value
        }
    }
    fetch('/api/color-schemes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(scheme)
    })
}