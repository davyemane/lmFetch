
//recuperation de l'addresse dans l'url
//const url = window.location.search.split("?url=").join("");

const urlParams = new URLSearchParams(window.location.search);

const url_dell= urlParams.get('dell')
const url = urlParams.get('url')

console.log('dell',url_dell);
console.log('url',url);
//recuperation des champs html
const content = document.getElementById('content')
const NomChamp = document.getElementById('NomChamp')
 const mot = document.getElementById('mots')
//fonction qui récupère les données
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

    if (data.length==0 ) {
        alert('ce champ est vide')
    } else {
        if (content) {
            let data1=""
            let data2 =""
            var i=0  
            console.log(data.length)     
            while ( i < data.length) {
                
                 
                //data.map((values)=>{
    
                    data1+= `<li class="list-group-item bg-light-subtle">
                    <div class="row align-items-start"> 
                        <div class="col">   
                            <audio id="audios" src="${data[i].mots.Traduction[0].audio}" type="audio/mp3" controls>
                            </audio> <br>

                            <p class="font-weight-bold">${data[i].mots.ecriture}</p>
                    <span class="font-italic">${data[i].mots.Traduction[0].motTraduit}</span> <br>
        
                    <p class="d-inline-block text-truncate" style="max-width: 150px;">${data[i].corpus}</p><br>
                    <button type="button" class="btn btn-danger" id="dell" onclick="SupChamp()" >DELL<a href="contenu.html?url=${url}&dell=${data[i].url_Delete}" >.</a></button>
                    </div>
                    </div></li><br>
                    `
            i=i+1
                    }
                    content.innerHTML=data1
                    NomChamp.innerHTML=`<h2>champ Lexicale: ${data[0].champ}</h2>`
                }
    
    }
    //i=i+1
      //  }

    }


getChamp()


function SupChamp(e) {
    const endpoint = `http://localhost:8000/${url_dell}`
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
        }  
    }).then(x=>{
        console.log('x',x)
    }).catch(error => {
        console.log('erreur', error)
    })
}


//SupChamp()

const audioPlayer = document.getElementById("audios");


function sons () {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
};
