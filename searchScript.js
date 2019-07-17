"use strict";
const searchBox = document.getElementById('searchBox');
searchBox.addEventListener('keyup', (event) => {
    var color = false;
    for(var i=0; i < userBaseCol.results.length; i++){
        if(wordCheck(i, searchBox.value)){
           document.getElementById('shortInfo'+i).style.display = 'table-row';
            if(color==false){
                document.getElementById('shortInfo'+i).style.backgroundColor = '#cccccc';
                color = true;
            }
            else{
                document.getElementById('shortInfo'+i).style.backgroundColor = '#ededed';
                color = false;
            }
        }
        else{
            document.getElementById('shortInfo'+i).style.display = 'none';
        }
    }
    if(openedBlock !== -1) {
        closeFullInfo(openedBlock);
    }
    color = false;
});
function wordCheck(id, searchRequest) {
    var name = userBaseCol.results[id].name.first;
    if(name.includes(searchRequest)){
        return true;
    }
    else return false;
}