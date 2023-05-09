const JSONFILEPATH = "/angielski/data.json";
//! Robić mape w szerokosci max 1000
let data;

const MAP = document.getElementById("image-map")

const readJSONData = async (jsonFilePath) => {
    let jsonData = await fetch(jsonFilePath).then(response => response.json());
    console.log(jsonData)
    data = jsonData
    return jsonData
}
readJSONData(JSONFILEPATH);
/*const displayJSON = async () => {
    let data = await readJSONData();
    console.log(data["countries"][0])
}*/

const showInformation = (title, about) => {
    let aboutELement = document.querySelector(".about");
    aboutELement.innerHTML = 
    `
        <img id="picture" src="/angielski/img/uk/${title}.png" alt="${title}">
        <h2>${title}</h2>
        <p>${about}</p>
    `
}

const showData = (evt) => {
    let elem = evt.target.title;
    if(
        elem === "England" ||
        elem === "Scotland" ||
        elem === "Wales" ||
        elem === "Northern Ireland"
    ) {
        showInformation(elem, data["countries"][elem]["description"])
    } else {
        showInformation(elem, data["cities"][elem])
    }
}

let areas = Array.from(document.getElementsByTagName("area"))
areas.forEach(element => {
    console.log(element.title)
    element.addEventListener("click", (evt) => {
    showData(evt)
    
  })
});