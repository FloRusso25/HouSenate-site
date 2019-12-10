var vue = new Vue({
    el:"#app",
    data:{
        states:[],
        selectedState:"",
        legislators:{},
        
    },
    
});

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
        
        localStorage.setItem("metadata", JSON.stringify(json));
        getStates();
       
        
    }).catch (function(error){
        console.error(error);
    })
}
let metaUrl="https://openstates.org/api/v1/metadata/";
let stateUrl="https://openstates.org/api/v1/legislators/?state=ca";
getMembers( metaUrl, "53be32ec-fc59-4917-953f-4e53b5a98c12");

function getStates(){
    JSON.parse(localStorage.getItem("metadata")).forEach(i=>vue.states.push(i.name));
    vue.states.sort();
}