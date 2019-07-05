"use strict";
var color = false;
var userBaseCol = null;
var maleCounter = 0;
var femaleCounter = 0;
var openedBlock = -1;
var closeChartBtn = document.getElementById('close-chart');
function getUserBase() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://randomuser.me/api/?results=50&nat=us,dk,fr,gb', false);
    xhr.send();
    if(xhr.readyState === 4 && xhr.status === 200) {
        var user_base = JSON.parse(xhr.response);
    }
    else {
        alert("Ошибка загрузки базы клиентов №" + xhr.status);
        return;
    }
    return user_base;
}
function addUserShort(i, userList){
    var new_user = document.createElement('tr');
   // new_user.className = 'user';
    //Аватар
    var avatar = document.createElement('img');
    avatar.className = 'avatar';
    avatar.src = userBaseCol.results[i].picture.thumbnail;
    new_user.appendChild(avatar);
    //Фамилия
    var lName = document.createElement('td');
    lName.style.textTransform = 'capitalize';
    lName.textContent = userBaseCol.results[i].name.last;
    new_user.appendChild(lName);
    //Имя
    var fName = document.createElement('td');
    fName.style.textTransform = 'capitalize';
    fName.textContent = userBaseCol.results[i].name.first;
    new_user.appendChild(fName);
    //Username
    var uName = document.createElement('td');
    uName.textContent = userBaseCol.results[i].login.username;
    new_user.appendChild(uName);
    //Телефон
    var phoneNum = document.createElement('td');
    phoneNum.textContent = userBaseCol.results[i].phone;
    new_user.appendChild(phoneNum);
    //Локация
    var state = document.createElement('td');
    state.textContent = userBaseCol.results[i].location.state;
    new_user.appendChild(state);
    //Плюс
    var plus = document.createElement('img');
    plus.src = 'plus.png';
    plus.className = 'plus';
    plus.id = 'sign'+i;
    new_user.appendChild(plus);
    if(color==false){
        new_user.style.backgroundColor = '#cccccc';
        color = true;
    }
    else{
        new_user.style.backgroundColor = '#ededed';
        color = false;
    }
    new_user.id = 'shortInfo'+i;
    new_user.onclick = function(){
        showCloseFullInfo(new_user.id);
    }
    new_user.style.cursor = 'pointer';
    userList.appendChild(new_user);
    if(getGender(i))maleCounter++;
    else femaleCounter++;
}
function addUserFull(i, userList) {
    var newUserFullInfo = document.createElement('div');
    newUserFullInfo.id = 'fullInfo'+i;
    newUserFullInfo.style.display = 'none';
    newUserFullInfo.style.marginLeft = '35%';

    var name = document.createElement('div');
    name.textContent = userBaseCol.results[i].name.first;
    name.style.textTransform = 'capitalize';

    var genderPic = document.createElement('img');
    if(getGender(i))genderPic.src = 'male.png';
    else genderPic.src = 'female.png';

    name.appendChild(genderPic);
    newUserFullInfo.appendChild(name);

    var usernameF = document.createElement('p');
    var usernameN = document.createElement('strong');
    usernameN.textContent = 'Username ';
    usernameN.style.display = 'inline';
    usernameN.style.fontWeight = 'bold';
    var usernameI = document.createElement('p');
    usernameI.textContent = userBaseCol.results[i].login.username;
    usernameI.style.display = 'inline';
    usernameF.appendChild(usernameN);
    usernameF.appendChild(usernameI);
    newUserFullInfo.appendChild(usernameF);
    userList.appendChild(newUserFullInfo);
}
function addUsersToTable(){
    var userList = document.getElementById('user_list');
    userBaseCol = getUserBase();
    for(var i = 0; i < userBaseCol.results.length; i++){
       addUserShort(i, userList);
       addUserFull(i, userList)
    }
}
function getGender(i) {
    if(userBaseCol.results[i].gender === 'male')return true;
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
    if(searchableId !== -1){
        window.scrollTo(0, 50*searchableId);
        showCloseFullInfo('shortInfo'+searchableId);
    }
    else alert('Sorry paw')
}
function getIdOfSearchable() {
    for(var i=0; i < userBaseCol.results.length; i++){
        if(userBaseCol.results[i].name.first === searchBox.value) return i;
    }
    return -1;
}
function showCloseFullInfo(shortInfoId){
    var Id = shortInfoId.replace('shortInfo','');
    var fullInfo = document.getElementById('fullInfo' + Id);
    if(openedBlock !== -1 && openedBlock !== Id)closeFullInfo(openedBlock);
    if(fullInfo.style.display === 'none'){
        fullInfo.style.display = 'block';
        document.getElementById('sign'+Id).src = 'minus.png';
        openedBlock = Id;
    }
    else {
        closeFullInfo(Id);
    }
}
function closeFullInfo(Id) {
    var fullInfo = document.getElementById('fullInfo' + Id);
    fullInfo.style.display = 'none';
    document.getElementById('sign'+Id).src = 'plus.png';
    openedBlock = -1;
}
addUsersToTable();
