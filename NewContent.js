const baseEndpoint = "http://localhost:8002"
const champ = document.getElementById('ListChamp')
const mots = document.getElementById('mots')

const listChamps = document.getElementById('listChamps')

const input_champ = document.getElementById('inputChamp')

const edditChamps = document.getElementById('ChampDatas')

var idChamp = ""


//fonction qui récupère un champ
function getChamp() {
    const endpoint = `${baseEndpoint}/formation/champ_List/`;
    const options = {
        method: "GET",
        headers:{
            "Content-Type":"application/json",
        }
    }
    fetch(endpoint, options)
    .then(response=>response.json())
    .then(data=>{
        console.log('champ', data);
        writeTocontainer(data);
    })
}

// fonction qui ecrit dans le champ approprié
function writeTocontainer(data) {
    let data2 = ""
    let data3 = ""

if (champ) {
    let data1=""
    var i=0  
    console.log(data.length)     
    while ( i < data.length) {
        
         
        //data.map((values)=>{

            data1+= `<option value="${data[i].id_ChampLexicale}">${data[i].NomChamp}</option>`
            data2+=`                                                                        <li class="border border-success">
            <div class="row">
                <div class="col-4"><img src="${data[i].image}" class="img-thumbnail" alt="..."></div>
                <div class="col-4" style="padding-top: 9%;"><h5 style="font-size: x-large; font-weight: bolder;">${data[i].NomChamp}</h5></div>
                <div class="col-2" style="padding-top: 6%; "><img src="img/dell.png" alt="" style="height: 50%;" onclick="SupChamp(${data[i].id_ChampLexicale})" class="btn"></div>
                <div class="col-2" style="padding-top: 6%; " data-bs-toggle="modal" onclick="ediChamp(${data[i].id_ChampLexicale})" data-bs-target="#editModal" ><img src="/img/border_color_black_24dp.svg" alt="" class="btn"></div>
            </div>
        </li>
`
    i=i+1
            } 
            champ.innerHTML=data1
        }
        listChamps.innerHTML = data2
        
    }


        //recuperation d'un nouveau mot
        
        function getMots() {
            const endpoint = `http://localhost:8002/formation/Niveau/Mots/`;
            const options = {
                method: "GET",
                headers:{
                    "Content-Type":"application/json",
                }
            }
            fetch(endpoint, options)
            .then(response=>response.json())
            .then(das=>{
                console.log(das);
                writeMotsTocontainer(das);
            })
        }
        
        // fonction qui ecrit dans le champ approprié
        function writeMotsTocontainer(das) {
        if (mots) {
            let data2=""
            var i=0  
            console.log(das.length)     
            while ( i < das.length) {
                
                 
                //data.map((values)=>{
        
                    data2+= `<option value="${das[i].id_Mot}">${das[i].ecriture}</option>`
            i=i+1
                    } 
                    mots.innerHTML=data2
        
                }}
        


                const DataForm = document.getElementById('contenuForm')

                if (DataForm) {
                    DataForm.addEventListener('submit', addMot)
                }
                
                //fonction qui permet un mot
                function addMot(e) {
                    e.preventDefault();
                    const endpoint = `http://localhost:8002/formation/champ/create`
                    let DataFormData = new FormData(DataForm);
                    let ChampObjectData = Object.fromEntries(DataFormData)
                    let bodyJsonData = JSON.stringify(ChampObjectData) 
                    console.log(bodyJsonData)
                
                    const options = {
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json",
                        },
                
                        body: bodyJsonData,
                    }
                
                    fetch(endpoint, options)
                    .then(response =>{
                        console.log('reponse',response)
                        if (response.ok==true) {
                            alert('insertion reussit')
                        }  
                                    })
                    .then(x=>{
                        console.log('x',x)
                    }).catch(error => {
                        console.log('erreur', error)
                    })
                }

//mise a jour d'un champs spécifique

                function ediChamp(id) {
                    const endpoint = `http://localhost:8002/formation/champ_Update/${id}`;
                    idChamp = id
                    const options = {
                        method: "GET",
                        headers:{
                            "Content-Type":"application/json",
                        }
                    }
                    fetch(endpoint, options)
                    .then(response=>response.json())
                    .then(data=>{
                        console.log('edit',data);
                        writeToeditcontainer(data);
                    })
                }
                
                // fonction qui ecrit dans le champ approprié
                function writeToeditcontainer(data) {
                if (input_champ) {
                    alert('ok')
                    input_champ.setAttribute('value', data.NomChamp)
                            } 
                            
                
                        }


                        if (edditChamps) {
                            edditChamps.addEventListener('submit', edditChamp)
                        }
                        
                            function edditChamp(e,) {
                                e.preventDefault();
                                const endpoint = `http://localhost:8002/formation/champ_Update/${idChamp}`
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
                    
//fonction qui fait la suppression

                            function SupChamp(del) {
                                const endpoint = `http://localhost:8002/formation/champ_destroy/${del}`
                                const options = {
                                    method:"DELETE",
                                    headers:{
                                        "Content-Type":"application/json",
                                    }
                                }
                            
                                fetch(endpoint, options)
                                .then(response =>{
                                    console.log('reponse',response)
                                    if (response.ok==true) {
                                        alert('object supprimer')
                                        location.href='index1.html'

                                    }  
                                }).then(x=>{
                                    console.log('x',x)
                                }).catch(error => {
                                    console.log('erreur', error)
                                })
                            }
                            
                
getChamp()
getMots()