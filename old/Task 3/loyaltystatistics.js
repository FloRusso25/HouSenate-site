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
numOfReps(myMembers);
ptgVotedWParty(myMembers);
loadAtGlanceTable();
leastLoy(myMembers);
mostLoy(myMembers);
loadLeastLoyalTable(statistics.leastLoyal);
loadMostLoyalTable(statistics.mostLoyal);

function putNumCongress(){
    document.getElementById("numCongress").innerHTML = `Congress ${data.results[0].congress}`;
}

function numOfReps(members){
    
    for(let i=0;i<members.length;i++){
        if(members[i].party=="R"){
            statistics.rep++;
        }else{
            if(members[i].party=="D"){
                statistics.dem++;
            }else{
                statistics.ind++;
            }
        } 
    }
}

function ptgVotedWParty(members){
    let voteR=0;
    let voteD=0;
    let voteI=0;
    
    for(let i=0;i<members.length;i++){
        
        if(members[i].party=="R"){
            voteR+=members[i].votes_with_party_pct;
        }else{
            if(members[i].party=="D"){
                voteD+=members[i].votes_with_party_pct;
            }else{
                voteI+=members[i].votes_with_party_pct;
            }
        }
    }
    
    statistics.ptgVotesRep=(voteR/statistics.rep).toFixed(2);
    statistics.ptgVotesDem=(voteD/statistics.dem).toFixed(2);
    statistics.ptgVotesInd=(voteI/((statistics.ind==0)?1:statistics.ind)).toFixed(2);
    (statistics.ptgVotesDem==0||statistics.ptgVotesRep==0||statistics.ptgVotesInd==0)?
      statistics.totalPtgVotes=((parseFloat(statistics.ptgVotesDem)+parseFloat(statistics.ptgVotesInd)+parseFloat(statistics.ptgVotesRep))/2).toFixed(2):statistics.totalPtgVotes=((parseFloat(statistics.ptgVotesDem)+parseFloat(statistics.ptgVotesInd)+parseFloat(statistics.ptgVotesRep))/3).toFixed(2)
}

function leastLoy(members){
    let chop=parseInt((members.length*0.1)); /*porcentaje de corte*/
    let aux=[];
    let i=0;
    for (i=0;i<members.length;i++){
       aux=members.sort(function(a,b){return (a.votes_with_party_pct)-(b.votes_with_party_pct);}); 
        while(aux[i].votes_with_party_pct <= aux[chop-1].votes_with_party_pct){
            statistics.leastLoyal.push(aux[i]);
            i++;
        } 
    }
    return statistics.leastLoyal;
}

function mostLoy(members){
    let chop=parseInt((members.length*0.1)); /*porcentaje de corte*/
    let aux=[];
    let i=0;
    for (i=0;i<members.length;i++){
       aux=members.sort(function(a,b){return (b.votes_with_party_pct)-(a.votes_with_party_pct);}); 
        
        while((aux[i].votes_with_party_pct) >= aux[chop-1].votes_with_party_pct){
            statistics.mostLoyal.push(aux[i]);
            i++;
        }
    }
    return statistics.mostLoyal;
}

function loadAtGlanceTable(){
    document.querySelector("#votedTable").innerHTML= `<tr> <td>Democrats</td><td>${statistics.dem}</td><td>${statistics.ptgVotesDem}</td> </tr> <tr> <td>Republicans</td><td>${statistics.rep}</td><td>${statistics.ptgVotesRep}</td> </tr> <tr> <td>Independents</td><td>${statistics.ind}</td><td>${statistics.ptgVotesInd}</td> </tr> <tr> <td>Total</td><td>${myMembers.length}</td><td>${statistics.totalPtgVotes}</td> </tr>`
}

function loadLeastLoyalTable(array){
    let str="";
    array.forEach((i)=>{str+=`<tr> <td><a target="blank" href="${i.url}">${i.last_name}, ${i.first_name}</a></td><td>${i.total_votes}</td><td>${i.votes_with_party_pct}</td> </tr>`});
    
    document.querySelector("#leastLoyalTable").innerHTML=str;
}

function loadMostLoyalTable(array){
    let str="";
    array.forEach((i)=>{str+=`<tr> <td><a target="blank" href="${i.url}">${i.last_name}, ${i.first_name}</a></td><td>${i.total_votes}</td><td>${i.votes_with_party_pct}</td> </tr>`});
    
    document.querySelector("#mostLoyalTable").innerHTML=str;
}

