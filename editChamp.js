const url = window.location.search.split("?").join("")
alert(url)
const baseEndpoint = "http://localhost:8000"
const champ = document.getElementById('NomChamp')
const mots = document.getElementById('mots')
const edditChamps = document.getElementById('ChampData')




function getChamp() {
    const endpoint = `http://localhost:8000/${url}`;
    const options = {
        method: "GET",
        headers:{
            "Content-Type":"application/json",
        }
    }
    fetch(endpoint, options)
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        writeTocontainer(data);
    })
}

// fonction qui ecrit dans le champ approprié
function writeTocontainer(data) {
if (champ) {

    champ.innerHTML= `<input type="text" class="form-control" aria-label="Sizing example input" value="${data.NomChamp}"  aria-describedby="inputGroup-sizing-sm" name="NomChamp">`
            } 
            

        }

     getChamp()


        if (edditChamps) {
        edditChamps.addEventListener('submit', edditChamp)
    }
    
        function edditChamp(e) {
            e.preventDefault();
            const endpoint = `http://localhost:8000/${url}`
            let DataFormData = new FormData(edditChamps);
            let ChampObjectData = Object.fromEntries(DataFormData)
            let bodyJsonData = JSON.stringify(ChampObjectData) 
            console.log(ChampObjectData)
        
            const options = {
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json",
                },
        
                body: bodyJsonData,
            }
        
            fetch(endpoint, options)
            .then(response =>{
                console.log('reponse',response)
                //return response.json()
                if (response.ok==true) {
                    alert('insertion reussit')
                }  
            }).then(x=>{
                console.log('x',x)
            }).catch(error => {
                console.log('erreur', error)
            })
        }


