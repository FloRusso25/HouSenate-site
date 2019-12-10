putNumCongress();
loadDropDown();
loadTable();
addEventCheckbox();
addEventSelect();



function loadTable(){
    document.getElementById("tableRows").innerHTML = filterList(getCheckedBox(), getSelectedOption());
}

function addEventSelect(){
    let select=document.querySelector("select[name=stateDrop]");
    select.addEventListener("click", loadTable);
    
}

function addEventCheckbox(){
    let check=document.querySelectorAll("input[name=checkParty]");
    check.forEach(item =>item.addEventListener("click", loadTable));
}

function putNumCongress(){
    document.getElementById("numCongress").innerHTML = `Congress ${data.results[0].congress}`;
}

function getCheckedBox(){
    let arr=[];
    let checkbox=document.querySelectorAll("input[name=checkParty]:checked");
    checkbox.forEach((index, i)=>{arr.push(checkbox[i].value)});
    return arr;
}

function getSelectedOption(){
    let state=document.querySelector("select[name=stateDrop]");
    let selectedState=state.value;
    return selectedState;
}


function loadDropDown(){
    let myMembers=data.results[0].members;
    let aux=[];
    let str=`<option value="all">ALL</option>`;
    myMembers.forEach((item, i)=>{(aux.indexOf(myMembers[i].state)==-1)?aux.push(myMembers[i].state):null});
    aux.sort();
    for(let j=0; j<aux.length;j++){
        str+=`<option value="${aux[j]}">${aux[j]}</option>`; 
    }
    
    document.querySelector("select[name=stateDrop]").innerHTML=str;
}

function filterList(array, statSelect){
    let str="";
    let myMembers=data.results[0].members;
    myMembers.forEach((item, i)=>{array.forEach((item, j)=>{
        (myMembers[i].party==array[j] && (myMembers[i].state==statSelect || statSelect=="all"))?
                str+= `<tr>
                    <td><a target="blank"  href="${myMembers[i].url}">${myMembers[i].last_name}, 
                    ${myMembers[i].first_name} 
                    ${(myMembers[i].middle_name != null)? myMembers[i].middle_name:""}</a></td>
                    <td>${myMembers[i].party}</td>
                    <td>${myMembers[i].state}</td>
                    <td>${myMembers[i].seniority}</td>
                    <td>${myMembers[i].votes_with_party_pct}%</td>
                </tr>`
            :null })});
   return str;
}