
const DataForms = document.getElementById('ChampData')

if (DataForms) {
    DataForms.addEventListener('submit', addChamp)
}

function addChamp(e) {
    e.preventDefault();
    const endpoint = `http://localhost:8002/formation/champ_create/`
    let DataFormDatas = new FormData(DataForms);
    let ChampObjectDatas = Object.fromEntries(DataFormDatas)
    let bodyJsonDatas = JSON.stringify(ChampObjectDatas) 
    console.log(ChampObjectDatas)

    const options = {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },

        body: bodyJsonDatas,
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