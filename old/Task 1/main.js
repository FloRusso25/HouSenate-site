//JavaScript Array Functions

//Ejercicio 1
var arrClassNames = ["Nicolás", "Pedro", "Eugenio", "Rodrigo", "Tadeo", "Alcides", "Sebastian", "Juan", "Ricardo", "Roberto"];
var aux = [];
var temp;
for(var i=0;i<arrClassNames.length;i++){
    for(var j=i+1;j<arrClassNames.length;j++){
      if(arrClassNames[i]<arrClassNames[j]){
          aux=arrClassNames[i];
          arrClassNames[i]=arrClassNames[j];
          arrClassNames[j]=aux;
          
      } 
    }
}
for(var i=arrClassNames.length; i>0;i--){
    console.log(arrClassNames[i]);
}


//Ejercicio 2 con while
var arrAges = [22, 25, 34, 29, 28, 26, 27, 23, 20, 27];
var i = 0;
while (i < arrAges.length){
    if(arrAges[i]%2==0){
        console.log(arrAges[i]);
    }
    i++;
}

//Ejercicio 2 con for
for (i=0;i<arrAges.length;i++){
    if(arrAges[i]%2==0){
        console.log(arrAges[i]);
    }
}

//Ejercicio 3
function lowestNum(array){
    var min=array[0];
    for (var i=0; i<array.length;i++){
        if(array[i]<min){
            min=array[i];
        }
    }
    return min;
}

//Ejercicio 4
function bigestNum(array){
    var max=array[0];
    for (var i=0; i<array.length;i++){
        if(array[i]>max){
            max=array[i];
        }
    }
    return max;
}

//Ejercicio 5
function indexPrint (array, index){
    return array[index];
}

//Ejercicio 6
function valueRepeated (array){
    var aux=[];
    for (var i=0; i<array.length;i++){
        for (var j=i+1; j<array.length; j++){
            if(array[j]==array[i]){
                if(aux.indexOf(array[i])==-1){
                    aux.push(array[i]);
                }
            }
        }
   }
    return aux;   
}

//Ejercicio 7

function joinElements(array){
    var aux="";
    for (var i=0;i<array.length;i++){
      aux+=array[i];  
    }
    return aux;
}