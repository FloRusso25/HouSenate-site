var app=new Vue({
    el:'#app', //Id del HTML
    data:{
        chamber:"",
        congress:"",
        members:{},
        statistics:{
            dem:0,
            rep:0,
            ind:0,
            ptgVotesRep:0,
            ptgVotesDem:0,
            ptgVotesInd:0,
            totalPtgVotes:0,
            leastEngaged:[],
            leastLoyal:[],
            mostEngaged:[],
            mostLoyal:[]
        }
        
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
                
        loadStatistics(app.members);
        amountPartys(app.members);
        leastPerson(app.members);
        mostPerson(app.members);
       
        
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


function loadStatistics(members){
    let voteR=0;
    let voteD=0;
    let voteI=0;
    let divWoNull=0;
    
    for(let i=0;i<members.length;i++){
        
        if(members[i].party=="R"){
            app.statistics.rep++;
            voteR+=members[i].votes_with_party_pct;
        }else{
            if(members[i].party=="D"){
                app.statistics.dem++;
                voteD+=members[i].votes_with_party_pct;
            }else{
                app.statistics.ind++;
                voteI+=members[i].votes_with_party_pct;
            }
        }
    }
        app.statistics.ptgVotesRep=(voteR/app.statistics.rep).toFixed(2);
        app.statistics.ptgVotesDem=(voteD/app.statistics.dem).toFixed(2);
        app.statistics.ptgVotesInd=(voteI/((app.statistics.ind==0)?1:app.statistics.ind)).toFixed(2);
    
        (app.statistics.ptgVotesDem==0 && app.statistics.dem!=0)? divWoNull++ :null;
        (app.statistics.ptgVotesInd==0 && app.statistics.ind!=0)? divWoNull++ :null;
        (app.statistics.ptgVotesRep==0 && app.statistics.rep!=0)? divWoNull++ :null;
        
    
       app.statistics.totalPtgVotes= ((parseFloat(app.statistics.ptgVotesDem)+parseFloat(app.statistics.ptgVotesInd)+parseFloat(app.statistics.ptgVotesRep))/(amountPartys(members)-divWoNull)).toFixed(2);

    
}

function amountPartys(members){
    let aux=[]
    members.forEach(i=>{(aux.indexOf(i.party)==-1)?aux.push(i.party):null});
    return aux.length;
}

function leastPerson(members){
    let chop=parseInt((members.length*0.1)); /*porcentaje de corte*/
    let aux=[];
    let temp=[];
    let i=0;
    
    aux=[...members].sort(function(a,b){return b.missed_votes_pct-a.missed_votes_pct;});
    temp=[...members].sort(function(a,b){return (a.votes_with_party_pct)-(b.votes_with_party_pct)}); 
        
    while(aux[i].missed_votes_pct >= aux[chop-1].missed_votes_pct){
        app.statistics.leastEngaged.push(aux[i]);
        i++;
    }
    i=0;
    while(temp[i].votes_with_party_pct <= temp[chop-1].votes_with_party_pct){
        app.statistics.leastLoyal.push(temp[i]);
        i++;
    } 
    
}

function mostPerson(members){
    let chop=parseInt((members.length*0.1)); /*porcentaje de corte*/
    let aux=[];
    let temp=[];
    let i=0;
    
    aux=[...members].sort(function(a,b){return a.missed_votes_pct-b.missed_votes_pct;});
    temp=[...members].sort(function(a,b){return (b.votes_with_party_pct)-(a.votes_with_party_pct);}); 
        
    while(aux[i].missed_votes_pct <= aux[chop-1].missed_votes_pct){
        app.statistics.mostEngaged.push(aux[i]);
        i++;
    }
    i=0;
    while((temp[i].votes_with_party_pct) >= temp[chop-1].votes_with_party_pct){
        app.statistics.mostLoyal.push(temp[i]);
        i++;
    }
    
}