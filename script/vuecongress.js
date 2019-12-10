var app=new Vue({
    el:'#app', //Id del HTML
    data:{
        chamber:"",
        congress:"",
        members:{},
        partyChecked:["R", "D", "I"],
        states:[],
        stateSelected:"ALL"
    },
    methods:{
       
    }
    
});

var dato;
function getMembers(url, key){
    fetch(url, {
        method:"GET",
        headers:{"X-API-Key":key}
    }).then (function(response){
        if(response.ok){
            return response.json();
            
        } else{
            throw new Error();
        }
    }).then (function(json){
        app.chamber=json.results[0].chamber;
        app.congress=json.results[0].congress;
        app.members=json.results[0].members;
        app.states=sortNotRepeatStates(app.members);
       
        
    }).catch (function(error){
        console.log(error)  ;
    })
}

if(document.querySelector("#senate")!= null){
    getMembers("https://api.propublica.org/congress/v1/113/senate/members.json","xVrKoieqYsyt5vj6kQal35RY1gz1UmJ2eesXj4x2");
}
if(document.querySelector("#house")!= null){
    getMembers("https://api.propublica.org/congress/v1/113/house/members.json","xVrKoieqYsyt5vj6kQal35RY1gz1UmJ2eesXj4x2");
}


function sortNotRepeatStates(array){
    let aux=[];
    array.forEach(i=>{(aux.indexOf(i.state)==-1)?aux.push(i.state):null});
    aux.sort();
    aux.unshift("ALL");
    return aux;
}
