var xValues = ["lingala", "bulu", "tété", "Kituba", "Éton"];
var yValues = [55, 49, 44, 24, 15];
var barColors = ["red", "green","blue","orange","brown"];

const langues = document.getElementById('langue')
const content = document.getElementById('contents')

const pays = document.getElementById('pays')

var id_langues = 1


new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: true,
      text: "Langue en cours d'apprentissage"
    }
  }
});




const Corpus = document.getElementById('corpus')


const url_Delete = window.location.search.split("?").join("")

const loginForm = document.getElementById('login-form');
const baseEndpoint = "http://localhost:8002"
const champ = document.getElementById('champ')

const url = document.getElementById('url')

const urlParams = new URLSearchParams(window.location.search);


id_langues= urlParams.get('langue')

var dataChamp = []





if (loginForm) {
    loginForm.addEventListener('submit', getChamp)
}   

//fonction mère qui envoi les données au server d'api
function handleLogin(event) {
    event.preventDefault();
    const loginEndpoint = `${baseEndpoint}/api/token/`;
    let loginFormData = new FormData(loginForm);

    let loginObjectData = Object.fromEntries(loginFormData);

    let bodyJsonData = JSON.stringify(loginObjectData)

    const options ={
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: bodyJsonData
    } 

    fetch(loginEndpoint, options)
    .then(response => {

        console.log(response)
        return response.json()
    }).then(authData=>{
        handleAuthData(authData, getChamp)
    })
    .catch(err=>{
        console.log('erreur', err)
    })


}

//fonction qui recupère le token d'authentification
function handleAuthData(authData, callback) {
    localStorage.setItem('access', authData.access);
    localStorage.setItem('refresh', authData.refresh);

    if (callback) {
        callback();
    }
}


//fonction qui récupère les données
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
            console.log(data);
            writeTocontainer(data);
            dataChamp = data
        })
}

// fonction qui ecrit dans le champ approprié
function writeTocontainer(data) {
    if (champ) {
        let data1=""
        var i=0  
        console.log(data.length)     
        while ( i < data.length) {
            
             
            //data.map((values)=>{

                data1+= `<div class="col " style="height: 25%; width: 25%;">
                <button style="border: none; background: none;" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="getContent(${data[i].id_ChampLexicale})">
                    <img src="${data[i].image}" class="btn-circle img-thumbnail " id="img" style=" padding: none;height: 70%; width: 70%; alt="img" >
                    <p class="text-center" style="color: black;">${data[i].NomChamp}</p>

                </button>
            </div>
`
        i=i+1
                }
                champ.innerHTML=data1

            }
    //i=i+1
      //  }

    }

getChamp()

function getContent(urls) {


    const endpoint = `http://localhost:8002/formation/champ/?NomChamp=${urls}`;
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
        writeToModal(data, urls);
    })
}

// fonction qui ecrit dans le champ approprié
function writeToModal(data, urls) {
    let data1=""
    var corpus = ""
if (data.length==0 ) {
    alert('ce champ est vide')
} else {
    
    if (content) {
        var i=0  
        console.log(data.length)     
        while ( i < data.length) {
           var trad = data[i].mots.Traduction
            trad= trad.find(({langue})=> langue==id_langues) 
             
            //data.map((values)=>{
            if (trad!==undefined) {
                data1+= `<div>
                <h3>Mot Francais :${data[i].mots.ecriture}</h3>
                <p style="color: black;">${trad.motTraduit}</p>
                <audio src="${trad.audio}" controls></audio>
              </div>
    
                `
                corpus= `Exemple: <span> ${data[0].corpus}</span>`
                
            }

        i=i+1
                }
                
            }

}
content.innerHTML=data1
if (NomChamps) {
    NomChamps.innerHTML= dataChamp.find(({id_ChampLexicale})=> id_ChampLexicale==urls).NomChamp
}
Corpus.innerHTML = corpus

//i=i+1
  //  }

}


function SupChamp(e) {
    const endpoint = `http://localhost:8002/${url_Delete}`
    const options = {
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
        }
    }

    fetch(endpoint, options)
    .then(response =>{
        console.log('reponse',response)
        //return response.json()
        if (response.ok==true) {
            alert('object supprimer')
        }  
    }).then(x=>{
        console.log('x',x)
    }).catch(error => {
        console.log('erreur', error)
    })
}







function getLangue() {
    const endpoint = `${baseEndpoint}/formation/langue/list/`;
    const options = {
        method: "GET",
        headers:{
            "Content-Type":"application/json",
        }
    }
    fetch(endpoint, options)
    .then(response=>response.json())
    .then(datal=>{
        console.log(datal);
        writeTocontainerLangue(datal);
    })
}

// fonction qui ecrit dans le champ approprié
function writeTocontainerLangue(datal) {
    let dataP= ""
if (champ) {
    let data1=""
    var i=0  
    console.log('langues' ,datal.length)     
    while ( i < datal.length) {
        
         
        //data.map((values)=>{

            data1+= `<tr><td><button type="button" style="border: none; background-color: none;" value=""><a href="new_index.html?langue=${datal[i].id_langue}" class="btn btn-outline-success">${datal[i].libelleLangue}</a></button></td><td style="width: 200px;height: auto;"><div class="progress" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"> <div class="progress-bar bg-success" style="width: 25%"></div>    </div></td></tr>`
    i=i+1
            }
            langues.innerHTML=data1

        }

//i=i+1
  //  }

}






function getUneLangue() {
    const endpoint = `${baseEndpoint}/formation/${id_langues}/langue/details`;
    const options = {
        method: "GET",
        headers:{
            "Content-Type":"application/json",
        }
    }
    fetch(endpoint, options)
    .then(response=>response.json())
    .then(datal=>{
        console.log(datal);
        writeTocontaineruneLangue(datal);
    })
}

// fonction qui ecrit dans le champ approprié
function writeTocontaineruneLangue(datal) {

    if (pays) {
    let dataP=""
    var i=0  
    console.log('langues unique' ,datal.length)     

            dataP=`
            <p class="text-center fs-6 text" style="color: black; margin-top: 5%;">Pays d'origine : ${datal.paysOrigine}</p>
            <img src="${datal.drapeau}" class="rounded" alt="..." style="width: 100%;">
            `
            pays.innerHTML=dataP

        }

//i=i+1
  //  }

}


getLangue()
getUneLangue()