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
    //Аватар
    var avatarBlock = document.createElement('td');
    var avatar = document.createElement('img');
    avatar.className = 'avatar';
    avatar.src = userBaseCol.results[i].picture.thumbnail;
    avatarBlock.appendChild(avatar);
    new_user.appendChild(avatarBlock);
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
    var plusBlock = document.createElement('td');
    var plus = document.createElement('img');
    plus.src = 'plus.png';
    plus.className = 'plus';
    plus.id = 'sign'+i;
    plusBlock.appendChild(plus);
    new_user.appendChild(plusBlock);
    if(color==false){
        new_user.style.backgroundColor = '#cccccc';
        color = true;
    }
    else{
        new_user.style.backgroundColor = '#ededed';
        color = false;
    }
    new_user.id = 'shortInfo'+i;
    new_user.className = 'short-info';
    new_user.onclick = function(){
        showCloseFullInfo(new_user.id);
    }
    new_user.style.cursor = 'pointer';
    userList.appendChild(new_user);
    if(getGender(i))maleCounter++;
    else femaleCounter++;
}
function addUserFull(i, userList) {
    var fullInfoBlock = document.createElement('tr');
    fullInfoBlock.id = 'fullInfo'+i;
    fullInfoBlock.className = 'full-info';
    fullInfoBlock.style.display = 'none';
    userList.appendChild(fullInfoBlock);
}
function fillFullInfoBlock(fullInfoBlock, id) {
    var multiCell = document.createElement('td');
    multiCell.colSpan = 7;

    var outBlock = document.createElement('div');
    outBlock.style.marginLeft = '5%';
    outBlock.style.marginTop = '20px';
    //Имя
    var name = document.createElement('p');
    name.style.fontSize = '40px';
    name.style.color = '#666666';
    name.textContent = userBaseCol.results[id].name.first;
    name.style.textTransform = 'capitalize';
    var genderPic = document.createElement('img');
    if(getGender(id))genderPic.src = 'male.png';
    else genderPic.src = 'female.png';
    name.appendChild(genderPic);
    outBlock.appendChild(name);
    //Таблица
    var fullInfoTable = document.createElement('table');
    fullInfoTable.style.width = '80%';
    fullInfoTable.style.cssFloat = 'left';
    //Первая строка
    var tr1 = document.createElement('tr');
    //Никнейм
    var cell00 = document.createElement('td');
    var usernameF = document.createElement('p');
    var usernameN = document.createElement('strong');
    usernameN.textContent = 'Username ';
    usernameN.style.display = 'inline';
    usernameN.style.fontWeight = 'bold';
    var usernameI = document.createElement('p');
    usernameI.textContent = userBaseCol.results[id].login.username;
    usernameI.style.display = 'inline';
    usernameF.appendChild(usernameN);
    usernameF.appendChild(usernameI);
    cell00.appendChild(usernameF);
    tr1.appendChild(cell00);
    //Адресс
    var cell01 = document.createElement('td');
    var addresF = document.createElement('p');
    var addresN = document.createElement('strong');
    addresN.textContent = 'Address ';
    addresN.style.display = 'inline';
    addresN.style.fontWeight = 'bold';
    var addresI = document.createElement('p');
    addresI.textContent = userBaseCol.results[id].location.street;
    addresI.style.display = 'inline';
    addresF.appendChild(addresN);
    addresF.appendChild(addresI);
    cell01.appendChild(addresF);
    tr1.appendChild(cell01);
    //Дата рождения
    var cell02 = document.createElement('td');
    var birthDateF = document.createElement('p');
    var birthDateN = document.createElement('strong');
    birthDateN.style.fontWeight = 'bold';
    birthDateN.style.display = 'inline';
    birthDateN.textContent = 'Birthday ';
    birthDateF.appendChild(birthDateN);
    var birthDateI = document.createElement('p');
    birthDateI.style.display = 'inline';
    var birthDate = new Date(userBaseCol.results[id].dob.date);
    birthDateI.textContent = regDateParse(birthDate);
    birthDateF.appendChild(birthDateI);
    cell02.appendChild(birthDateF);
    tr1.appendChild(cell02);
    //Вторая строка
    var tr2 = document.createElement('tr');
    //Дата регистрации
    var cell10 = document.createElement('td');
    var regDateF = document.createElement('p');
    var regDateN = document.createElement('strong');
    regDateN.style.fontWeight = 'bold';
    regDateN.style.display = 'inline';
    regDateN.textContent = 'Registered ';
    regDateF.appendChild(regDateN);
    var regDateI = document.createElement('p');
    regDateI.style.display = 'inline';
    var regDate = new Date(userBaseCol.results[id].registered.date);
    regDateI.textContent = regDateParse(regDate);
    regDateF.appendChild(regDateI);
    cell10.appendChild(regDateF);
    tr2.appendChild(cell10);
    //Город
    var cell11 = document.createElement('td');
    var cityF = document.createElement('p');
    var cityN = document.createElement('strong');
    cityN.textContent = 'City ';
    cityN.style.display = 'inline';
    cityN.style.fontWeight = 'bold';
    var cityI = document.createElement('p');
    cityI.textContent = userBaseCol.results[id].location.city;
    cityI.style.display = 'inline';
    cityF.appendChild(cityN);
    cityF.appendChild(cityI);
    cell11.appendChild(cityF);
    tr2.appendChild(cell11);
    //Телефон
    var cell12 = document.createElement('td');
    var phoneF = document.createElement('p');
    var phoneN = document.createElement('strong');
    phoneN.textContent = 'Phone ';
    phoneN.style.display = 'inline';
    phoneN.style.fontWeight = 'bold';
    var phoneI = document.createElement('p');
    phoneI.textContent = userBaseCol.results[id].phone;
    phoneI.style.display = 'inline';
    phoneF.appendChild(phoneN);
    phoneF.appendChild(phoneI);
    cell12.appendChild(phoneF);
    tr2.appendChild(cell12);
    //Третья строка
    var tr3 = document.createElement('tr');
    //Почта
    var cell20 = document.createElement('td');
    var emailF = document.createElement('p');
    var emailN = document.createElement('strong');
    emailN.textContent = 'Email ';
    emailN.style.display = 'inline';
    emailN.style.fontWeight = 'bold';
    var emailI = document.createElement('p');
    emailI.textContent = userBaseCol.results[id].email;
    emailI.style.display = 'inline';
    emailF.appendChild(emailN);
    emailF.appendChild(emailI);
    cell20.appendChild(emailF);
    tr3.appendChild(cell20);
    //Почтовый индекс
    var cell21 = document.createElement('td');
    var postalCodeF = document.createElement('p');
    var postalCodeN = document.createElement('strong');
    postalCodeN.textContent = 'Zip code ';
    postalCodeN.style.display = 'inline';
    postalCodeN.style.fontWeight = 'bold';
    var postalCodeI = document.createElement('p');
    postalCodeI.textContent = userBaseCol.results[id].location.postcode;
    postalCodeI.style.display = 'inline';
    postalCodeF.appendChild(postalCodeN);
    postalCodeF.appendChild(postalCodeI);
    cell21.appendChild(postalCodeF);
    tr3.appendChild(cell21);
    //Мобильный
    var cell22 = document.createElement('td');
    var cellphoneF = document.createElement('p');
    var cellphoneN = document.createElement('strong');
    cellphoneN.textContent = 'Cell ';
    cellphoneN.style.display = 'inline';
    cellphoneN.style.fontWeight = 'bold';
    var cellphoneI = document.createElement('p');
    cellphoneI.textContent = userBaseCol.results[id].cell;
    cellphoneI.style.display = 'inline';
    cellphoneF.appendChild(cellphoneN);
    cellphoneF.appendChild(cellphoneI);
    cell22.appendChild(cellphoneF);
    tr3.appendChild(cell22);
    //Картинка
    var lAvatar = document.createElement('img');
    lAvatar.className = 'big-avatar';
    lAvatar.src = userBaseCol.results[id].picture.large;
    fullInfoTable.appendChild(tr1);
    fullInfoTable.appendChild(tr2);
    fullInfoTable.appendChild(tr3);
    outBlock.appendChild(fullInfoTable);
    outBlock.appendChild(lAvatar);
    multiCell.appendChild(outBlock);
    fullInfoBlock.appendChild(multiCell);
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
        fillFullInfoBlock(fullInfo, Id);
        fullInfo.style.display = 'table-row';
        document.getElementById('sign'+Id).src = 'minus.png';
        openedBlock = Id;
    }
    else {
        closeFullInfo(Id);
    }
}
function closeFullInfo(id) {
    var fullInfo = document.getElementById('fullInfo' + id);
    clearBlock(fullInfo);
    fullInfo.style.display = 'none';
    document.getElementById('sign'+id).src = 'plus.png';
    openedBlock = -1;
}
function clearBlock(fullInfo) {
    fullInfo.innerHTML = "";
}
function regDateParse(regDate) {
    var dd = regDate.getDate();
    var mm = regDate.getMonth()+1;
    var yyyy = regDate.getFullYear();
    if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }
    var result = dd+'/'+mm+'/'+yyyy;
    return result;
}
addUsersToTable();
