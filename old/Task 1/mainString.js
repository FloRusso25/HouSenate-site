//JavaScript String Functions

//Ejercicio 1
function reverseIt(num){
   var aux="";
   var str=num.toString();
   for (var i= str.length-1; i>=0; i--){
       aux+=str[i];
   }
   return parseInt(aux);
}

//Ejercicio 2
function sortIt(str){
    //var aux=str.split("");
    var temp;
    var st="";
     
    for (var i=0; i<str.length; i++){
      for (var j=i+1; j<str.length;j++){
        if(str[i]>str[j]){
          temp=str[i];
          str[i]=str[j];
          str[j]=temp;
          
        }
      }
     //st+=aux[i]; 
    }
    return str;
}

//Ejercicio 3
function myToUpper (str){
  var aux=str.split(" ");
  var temp;
  var st="";
  
  for (var i=0; i<aux.length; i++){
    temp=aux[i][0].toUpperCase();
    temp+=aux[i].substring(1)+" ";
    aux[i]=temp;
   st+=aux[i]; 
  }
  return st;
}

//Ejercicio 4
function searchLongest(str){
    var aux=str.split(" ");
    var temp="";
    var max=0;
    for(var i=0; i<aux.length;i++){
      if(aux[i].length>max){
          temp=aux[i];
          max=aux[i].length;
      }
    }
    return temp;
}