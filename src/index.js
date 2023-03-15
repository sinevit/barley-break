console.log('Привет!\nДля того чтобы начать игру, нужно нажать кнопку SHUFFLE AND START.'+
'\nТак же при переходе на другой размер игрового поля, игра начнется только при нажатии кнопки SHUFFLE AND START\n'+
'По кнопке PAUSE происходит остановка таймера, при повторном нажатии(там уже будет CONTINUE) таймер продолжает отсчет\n'+
'Звук вкл/выкл по значку\n'+
'По кнопке SAVE можно сохранить игру, после нажатия кнопка поменяет значения на LOAD. По нажатию кнопки LOAD загрузится сохраненный вариант, даже после перезагрузки страницы'+
'Выполнена проверка на решаемость матрицы.\n'+
'При выйгрыше выводится alert "Hooray!" и результаты записываются в таблицу результатов.')
import './assets/styles/normalize.scss'
import './assets/styles/main.scss';
import './assets/media/audio.mp3';
import './assets/media/favicon.ico';
import CreatePage from './createPage.js'
import CreateElem from './createElem.js'
import Timer from './timer.js'
import Sound from './Sound.js'
import getresultTable from './getResult'
import Cells from './Cells'



let field_size = 16;
const FIELD = document.querySelector('.field');
const COUNT_SIZE = document.querySelector('.count__size');
const COUNT_MOVES = document.querySelector('.count__moves');
const BTN_START = document.getElementById('Shuffle');
const BTN_PAUSE = document.getElementById('Pause');
const BTN_SOUND = document.getElementById('Sound');
const BTN_SAVE = document.getElementById('Save');
const BTN_RES = document.getElementById('Result');
const SIZE__ITEMS = document.querySelectorAll('.size__item');
const TIME =document.querySelector('.timer');
const timer = new Timer( {
    seconds: 0,
    minutes: '00',
    timerSeconds: 0,
    timerMinutes: 0,
    interval:null,
    counter: false,
});
const Cell = new Cells(field_size,JSON.parse(localStorage.getItem('tableResult'))||[]);
let tableResult = [];
let arrCells = [];


window.onload = function(){
    CreatePage;
    checkItemsSize();
    Cell.createCells(field_size,[...Array(field_size-1).keys()]);
}


// btns click
BTN_START.addEventListener('click', startGame)
BTN_PAUSE.addEventListener('click', pauseGame)

function startGame(){
    // localStorage.clear();
    // window.clearInterval(this.interval);
    // Cell.createCells(field_size,[...Array(field_size-1).keys()]);
    Cell.createCells(field_size,[...Array(field_size-1).keys()].sort(() => Math.random() - 0.5));
    timer.startTimer();
    removeNopointerClass();
}

function pauseGame(){
    let celles = document.querySelectorAll('.cell');
    let r = [...celles].map(el => el.classList.toggle('cell__nopointer'))
    timer.pauseTimer();
}

function removeNopointerClass(){
    let celles = document.querySelectorAll('.cell');
    let r = [...celles].map(el => el.classList.remove('cell__nopointer'))
}

// слушатель изменения размеров поля
function checkItemsSize(){
    let items = [...SIZE__ITEMS].map(item =>{
        item.addEventListener('click', function(e){
            COUNT_SIZE.innerHTML = e.target.innerHTML;
            FIELD.innerHTML ='';
            field_size = Math.pow(e.target.innerHTML[0],2);
            timer.stopTimer();
            Cell.createCells(field_size,[...Array(field_size-1).keys()]);
        })
    })
}

// кнопка вкл/выкл звук
BTN_SOUND.addEventListener('click', getSound)
function getSound(){
    if(BTN_SOUND.classList.contains('volume')){
        BTN_SOUND.classList.remove('volume');
        BTN_SOUND.classList.add('mute');
    }else{
        BTN_SOUND.classList.add('volume');
        BTN_SOUND.classList.remove('mute');
    }
}

//locale storage
window.addEventListener('load', getLocalStorage)
window.addEventListener('unload', setLocalStorage)
BTN_SAVE.addEventListener('click', checkBtnSave)

function checkBtnSave(){
    if(BTN_SAVE.innerHTML === 'LOAD'){
        BTN_SAVE.innerHTML = 'SAVE';
        getLocalStorage2();
    }else{
        BTN_SAVE.innerHTML = 'LOAD';
        setLocalStorage2();
    }
}
function setLocalStorage() {
    localStorage.setItem('btnSave', BTN_SAVE.innerHTML);
    localStorage.setItem('tableResult', JSON.stringify(tableResult.slice(0,10)));
    // localStorage.clear();
}
function setLocalStorage2(){
    localStorage.setItem('fieldSize', field_size);
    localStorage.setItem('size', COUNT_SIZE.innerHTML);
    localStorage.setItem('moves', COUNT_MOVES.innerHTML);
    localStorage.setItem('time', TIME.innerHTML);
    localStorage.setItem('cells', JSON.stringify(arrCells));
}

function getLocalStorage() {

    if(localStorage.getItem('btnSave')) {
        BTN_SAVE.innerHTML = localStorage.getItem('btnSave');
    }

}
function getLocalStorage2(){
    
    if(localStorage.getItem('fieldSize')) {
        field_size = localStorage.getItem('fieldSize');
    }
    if(localStorage.getItem('size')) {
        COUNT_SIZE.innerHTML = localStorage.getItem('size');
    }
    if(localStorage.getItem('moves')) {
        COUNT_MOVES.innerHTML = localStorage.getItem('moves');
    }
    if(localStorage.getItem('time')) {
        // console.log(+localStorage.getItem('time').split(':')[0],+localStorage.getItem('time').split(':')[1])
        timer.startTimer(localStorage.getItem('time').split(':')[1],localStorage.getItem('time').split(':')[0]);
    }
    if(localStorage.getItem('cells')) {
        let arr =JSON.parse(localStorage.getItem('cells'));
        // console.log(arr)
        Cell.createSaveCells(arr.length,arr); 
    }
}

// Создание и открытие таблицы результатов
BTN_RES.addEventListener('click', createResult)
function createResult(){
    getresultTable(tableResult);
    openPopup();
}

window.addEventListener('click', function(e){
    if(e.target.classList[0]=== 'popup__close' || e.target.classList[0]=== 'overlay'){
        closePopup();
    }
})

function closePopup(){
    let overlay= document.querySelector('.overlay');
    overlay.classList.remove('active');
}
function openPopup(){
    let overlay= document.querySelector('.overlay');
    overlay.classList.add('active');
}

function gettableResult() {
    tableResult = Cell.getResult();
    arrCells = Cell.getCellArr()
    if(Cell.win())timer.stopTimer();
  }
  
  setInterval(gettableResult, 1000);
