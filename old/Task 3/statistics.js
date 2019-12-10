const statistics={
    "dem":0,
    "rep":0,
    "ind":0,
    "ptgVotesRep":0,
    "ptgVotesDem":0,
    "ptgVotesInd":0,
    "totalPtgVotes":0,
    "leastEngaged":[],
    "leastLoyal":[],
    "mostEngaged":[],
    "mostLoyal":[]
    
    
}

let myMembers=data.results[0].members;

putNumCongress();
loadStatistics(myMembers);
leastPerson(myMembers);
mostPerson(myMembers);

loadTables("#votedTable", []);
loadTables("#leastEngagedTable", statistics.leastEngaged);
loadTables("#mostEngagedTable", statistics.mostEngaged);
loadTables("#leastLoyalTable", statistics.leastLoyal);
loadTables("#mostLoyalTable", statistics.mostLoyal);


function putNumCongress(){
    document.getElementById("numCongress").innerHTML = `Congress ${data.results[0].congress}`;
}

function loadStatistics(members){
    let voteR=0;
    let voteD=0;
    let voteI=0;
    let divWoNull=0;
    
    for(let i=0;i<members.length;i++){
        
        if(members[i].party=="R"){
            statistics.rep++;
            voteR+=members[i].votes_with_party_pct;
        }else{
            if(members[i].party=="D"){
                statistics.dem++;
                voteD+=members[i].votes_with_party_pct;
            }else{
                statistics.ind++;
                voteI+=members[i].votes_with_party_pct;
            }
        }
    }
        statistics.ptgVotesRep=(voteR/statistics.rep).toFixed(2);
        statistics.ptgVotesDem=(voteD/statistics.dem).toFixed(2);
        statistics.ptgVotesInd=(voteI/((statistics.ind==0)?1:statistics.ind)).toFixed(2);
    
        (statistics.ptgVotesDem==0)? divWoNull++ :null;
        (statistics.ptgVotesInd==0)? divWoNull++ :null;
        (statistics.ptgVotesRep==0)? divWoNull++ :null;
        
    
       statistics.totalPtgVotes= ((parseFloat(statistics.ptgVotesDem)+parseFloat(statistics.ptgVotesInd)+parseFloat(statistics.ptgVotesRep))/(amountPartys(members)-divWoNull)).toFixed(2);

    
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
        statistics.leastEngaged.push(aux[i]);
        i++;
    }
    i=0;
    while(temp[i].votes_with_party_pct <= temp[chop-1].votes_with_party_pct){
        statistics.leastLoyal.push(temp[i]);
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
        statistics.mostEngaged.push(aux[i]);
        i++;
    }
    i=0;
    while((temp[i].votes_with_party_pct) >= temp[chop-1].votes_with_party_pct){
        statistics.mostLoyal.push(temp[i]);
        i++;
    }
    
}

function loadTables(tableId, array){
    if(document.querySelector(tableId)!=null){
        if(tableId=="#votedTable"){
            document.querySelector("#votedTable").innerHTML=`<tr> <td>Democrats</td><td>${statistics.dem}</td><td>${statistics.ptgVotesDem}</td> </tr> <tr> <td>Republicans</td><td>${statistics.rep}</td><td>${statistics.ptgVotesRep}</td> </tr> <tr> <td>Independents</td><td>${statistics.ind}</td><td>${statistics.ptgVotesInd}</td> </tr> <tr> <td>Total</td><td>${myMembers.length}</td><td>${statistics.totalPtgVotes}</td> </tr>`   
        }
        if(tableId=="#leastEngagedTable" || tableId=="#mostEngagedTable"){
              let str="";
            array.forEach((i)=>{str+=`<tr> <td><a target="blank" href="${i.url}">${i.last_name}, ${i.first_name}</a></td><td>${i.missed_votes}</td><td>${i.missed_votes_pct}</td> </tr>`});
    
            document.querySelector(tableId).innerHTML=str;
        }
        
        if(tableId=="#leastLoyalTable"){
            let str="";
            array.forEach((i)=>{str+=`<tr> <td><a target="blank" href="${i.url}">${i.last_name}, ${i.first_name}</a></td><td>${i.total_votes}</td><td>${i.votes_with_party_pct}</td> </tr>`});
    
            document.querySelector("#leastLoyalTable").innerHTML=str; 
        }
        if(tableId=="#mostLoyalTable"){
            let str="";
            array.forEach((i)=>{str+=`<tr> <td><a target="blank" href="${i.url}">${i.last_name}, ${i.first_name}</a></td><td>${i.total_votes}</td><td>${i.votes_with_party_pct}</td> </tr>`});
    
            document.querySelector("#mostLoyalTable").innerHTML=str;
        }
    }
    
}