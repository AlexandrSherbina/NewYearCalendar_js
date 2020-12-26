//
function fillSelect(select, arr) {
    arr.forEach(function (elem) {
        select.add(new Option(elem));
    });
}
function range(from, to) {
    let result = [];
    for (let i = from; i <= to; i++) {
        result.push(i);
    }
    return result;
}
// добавление нуля к еденичному числу
function addZero(num) {
    if (num <= 9) {
        num = '0' + num;
    }
     return num;
 }

// table Calendar & watch
let tableDays = document.getElementById('table-days');
let yearId = document.getElementById('years-calendar');
let monthId = document.getElementById('months-calendar');
let daysId = document.getElementById('days-calendar');
let watch = document.getElementById('watch');

let date = new Date();
let getyear = date.getFullYear();
let month = date.getMonth(); 
let days = date.getDate();

yearCalendar(); monthCalendar(); dayCalendar(); watchFunc();
function yearCalendar() {
    fillSelect(yearId, range(getyear - 50, getyear + 50)); 
    yearId.selected = yearId.value = getyear;   
}

function monthCalendar() {   
   let monthsArr = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
    fillSelect(monthId, monthsArr);  
    monthId.selected = monthId.value = monthsArr[month];    
}
function dayCalendar() {
     fillSelect(daysId, range(1, 31));  
     daysId.selected = daysId.value = days; 
}
funcTable();
function funcTable() {
   for (let i = 0; i < 5; i++) {
       let tr = document.createElement('tr');
       for (let j = 0; j < 7; j++) {
           let td = document.createElement('td');
           tr.appendChild(td);  
       }
       tableDays.insertAdjacentElement('beforeEnd', tr);
   }
}
dayTable();
function dayTable() {
    let td = tableDays.querySelectorAll('td');
    for (let i = 1; i <= 31; i++) {    
        if (td) {
            td[i].innerHTML = i;
        }       
        if (td[i].innerHTML == days) {
            td[i].style.cssText = 'background-color: rgb(65 39 42);color: #f60505; font-weight: bold';
        }   
    }
}

function watchFunc() {   
    window.setInterval(() => {
        let date = new Date();        
        watch.innerHTML = `${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`;
    }, 1000);
}
// year display 
// исчезает год текущий появляется год новый с нарастанаием
let yearBlockId = document.querySelector('.year-block');
yearFunc();
function yearFunc() {
    let change = 31 - date.getDate();
   if (change > 0) {
        yearBlockId.style.opacity = '0.'+ change;
        yearBlockId.innerHTML = date.getFullYear();
   } 
}
// arrow watch **////////////////////
//arrows button
let arrowSecId = document.getElementById('arrow-sec');
let arrowMinId = document.getElementById('arrow-min');
let arrowHourId = document.getElementById('arrow-hour');
// function arrows
let sec = getTime('getSeconds', arrowSecId);
let min = getTime('getMinutes', arrowMinId);
let hour = getTime('getHours', arrowHourId);

// get timer 
function getTime(timeArrow, id) {
    let stopTimer =  setInterval(function moveArrow() {
        let date = new Date(); 
        let timeGen;
            if (timeArrow == 'getSeconds') {
                    timeGen = date.getSeconds();      
            }
            if (timeArrow == 'getMinutes') {
                    timeGen = date.getMinutes();             
            }  
            if (timeArrow == 'getHours') {
                    timeGen = date.getHours();             
            }  
        let grade = timeGen * 6;
            id.style.transform = 'rotate('+ grade +'deg)'; 
    }, 1000);  
    // остановка таймера
    let stopSecId = document.getElementById('stop-sec');
        stopSecId.addEventListener('click', stopMove);
        function stopMove() {
                clearInterval(stopTimer); 
                stopSecId.disabled = true;
                startSecId.disabled = false;
        }  
        // старт таймера
        let startSecId = document.getElementById('start-sec');
            startSecId.addEventListener('click', funcStart );
            function funcStart(sec, min, hour) {
                sec = getTime('getSeconds', arrowSecId);
                min = getTime('getMinutes', arrowMinId);
                hour = getTime('getHours', arrowHourId);
            }
                stopSecId.disabled = false;
                startSecId.disabled = true;      
}


// clock-face
let clockFaceId = document.getElementById('clock-face');
clockFace(clockFaceId);
function clockFace(elem) {  
    let pos = 0;
    let stopT = setInterval(() => { 
        pos += 2;
          if (pos <= 360) {         
            let div = document.createElement('div');    
                div.classList.add('line-clock');    
                div.innerHTML = '|';       
                elem.appendChild(div); 
                div.style.transform = 'rotate('+pos+'deg)';            
          } 
          if (pos == 360) {
          clearInterval(stopT);
                let line= document.querySelectorAll('.line-clock');
                for (let i = 0; i < line.length; i++) {
                       //line[i].remove();   
                }  
              //  clockFace(clockFaceId);             
            }     
     }, 50);   
}

