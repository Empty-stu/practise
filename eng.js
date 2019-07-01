"use strict";
var color = false;
var userBaseCol = null;
var maleCounter = 0;
var femaleCounter = 0;
var closeChartBtn = document.getElementById('close-chart');
function getUserBase() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://randomuser.me/api/?results=50&nat=us,dk,fr,gb', false);
    xhr.send();
    if(xhr.readyState == 4 && xhr.status == 200) {
        var user_base = JSON.parse(xhr.response);
    }
    else {
        alert("Ошибка загрузки базы клиентов №" + xhr.status);
        return;
    }
    return user_base;
}
function addUser(i){
    var new_user = document.createElement('user');
    //Аватар
    var avatar = document.createElement('avatar');
    avatar.style.backgroundImage = 'url('+userBaseCol.results[i].picture.thumbnail+')';
    new_user.appendChild(avatar);
    //Фамилия
    var lName = document.createElement('sename');
    lName.textContent = userBaseCol.results[i].name.last;
    new_user.appendChild(lName);
    //Имя
    var fName = document.createElement('name');
    fName.textContent = userBaseCol.results[i].name.first;
    new_user.appendChild(fName);
    //Username
    var uName = document.createElement('param');
    uName.textContent = userBaseCol.results[i].login.username;
    new_user.appendChild(uName);
    //Телефон
    var phoneNum = document.createElement('param');
    phoneNum.textContent = userBaseCol.results[i].phone;
    new_user.appendChild(phoneNum);
    //Локация
    var state = document.createElement('param');
    state.textContent = userBaseCol.results[i].location.state;
    new_user.appendChild(state);
    //Плюс
    var plus = document.createElement('plus');
    new_user.appendChild(plus);
    if(color==false){
        new_user.style.backgroundColor = '#cccccc';
        color = true;
    }
    else{
        new_user.style.backgroundColor = '#ededed';
        color = false;
    }
    user_list.appendChild(new_user);
    //перевод на сл. строку
    user_list.appendChild(document.createElement('br'))
    if(getGender(i))maleCounter++;
    else femaleCounter++;
}
function addUsersToTable(){
    userBaseCol = getUserBase();
    for(var i = 0; i < userBaseCol.results.length; i++){
       addUser(i);
    }
}
function getGender(i) {
    if(userBaseCol.results[i].gender == 'male')return true;
    else return false;
}
function showChart() {
    modal.style.display = 'block';
}
function closeChart() {
    modal.style.display = 'none';
}
function search(searchBox){
    var searchableId = getIdOfSearchable();
    if(searchableId != -1){

    }
    else alert('Sorry paw')
}
function getIdOfSearchable() {
    for(var i=0; i < userBaseCol.results.length; i++){
        if(userBaseCol.results[i].name.first == searchBox.value) return i;
    }
    return -1;
}
addUsersToTable();