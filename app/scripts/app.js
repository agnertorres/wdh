'use strict';

var notes = JSON.parse(localStorage.getItem('notes')) || [],
    totalWorkedHours = document.getElementById('total-worked-hours'),
    tabItens = document.getElementsByClassName("tab-item"),
    noteTableBody = document.querySelector('#note-table tbody'),
    saveEditedNoteBtn = document.getElementById('edit-note-btn'),
    backNoteBtn = document.getElementById('back-note-btn'),
    mainContent = document.getElementById('main-content');

for(var i=0; i < tabItens.length; i++){
  tabItens[i].addEventListener('click', function(){
    changeTab(this);
  });
}

function reloadPage(){
  addNotesToTable(notes);
  calculateTotalWorkedAllTheTime(notes);
}

function changeTab(el){
  var noteContent = document.getElementById("note-content"),
      newNoteContent = document.getElementById("new-note-content"),
      reportContent = document.getElementById("report-content");

  for(var i=0; i < tabItens.length; i++){
    tabItens[i].classList.remove('active-tab');
  }

  el.classList.add('active-tab');

  switch (el.getAttribute('id')) {
    case 'note-item':
      noteContent.classList.remove('hide');
      newNoteContent.classList.add('hide');
      reloadPage();

      break;
    case 'new-note-item':
      newNoteContent.classList.remove('hide');
      noteContent.classList.add('hide');

      break;
    default:

  }
}

function zeroLeft( number ){
  return ( number < 10 ? "0" + number : number);
}

function formatDate(d){

  var date = d.split('-'),
      newDate = new Date(date[0], date[1]-1, date[2]);

  var day = newDate.getDate(),
      month = newDate.getMonth()+1,
      year = newDate.getFullYear(),
      formatedDate = "";

  if(day < 10){
    day = "0"+day;
  }

  if(month < 10){
    month = "0"+month;
  }

  formatedDate = day + "/" + month + "/" + year;
  return formatedDate;
}

function calculateTotalWorkedInDay(firstEntry, firstExit, secondEntry, secondExit) {
  var firstEntryArray = firstEntry.split(':'),
      firstExitArray = firstExit.split(':'),
      secondEntryArray = secondEntry.split(':'),
      secondExitArray = secondExit.split(':');

  var firstEntryHours = parseInt(firstExitArray[0],10) - parseInt(firstEntryArray[0],10),
      firstEntryMinutes = parseInt(firstExitArray[1],10) - parseInt(firstExitArray[1],10);

  var secondEntryHours = parseInt(secondExitArray[0], 10) - parseInt(secondEntryArray[0], 10),
      secondEntryMinutes = parseInt(secondExitArray[1], 10) - parseInt(secondEntryArray[1], 10);

  if(firstEntryMinutes < 0){
    firstEntryMinutes += 60;
    firstEntryHours -= 1;
  }

  if(secondEntryMinutes < 0){
    secondEntryMinutes += 60;
    secondEntryHours -= 1;
  }

  var totalHours = firstEntryHours + secondEntryHours,
      totalMinutes = firstEntryMinutes + secondEntryMinutes,
      total = zeroLeft(totalHours) + ':' + zeroLeft(totalMinutes);

  return total;
}

function editNote(note){
  var editNoteForm = document.getElementById('edit-note-form'),
      noteId = note.parentNode.parentNode.getAttribute('data-unique-id'),
      editNoteDateTitle = document.getElementById('edit-note-date-title'),
      editNoteBtn = document.getElementById('edit-note-btn'),
      noteObjetc = {};

  for(var i = 0; i < notes.length; i++){
    if(notes[i].id == noteId){
      noteObjetc = notes[i];
      break;
    }
  }

  editNoteDateTitle.innerHTML = noteObjetc.date;
  editNoteForm.editNoteDate.value = noteObjetc.date;
  editNoteForm.editFirstEntry.value = noteObjetc.firstEntry;
  editNoteForm.editFirstExit.value = noteObjetc.firstExit;
  editNoteForm.editSecondEntry.value = noteObjetc.secondEntry;
  editNoteForm.editSecondExit.value = noteObjetc.secondExit;

  saveEditedNoteBtn.addEventListener('click', function(){

    if(isEmpty(editNoteForm.editNoteDate.value) || isEmpty(editNoteForm.editFirstEntry.value) || isEmpty(editNoteForm.editFirstExit.value) || isEmpty(editNoteForm.editSecondEntry.value) || isEmpty(editNoteForm.editSecondExit.value)){
      alert("Todos os campos são obrigatórios.");

    } else{

      if(isValidHour(editNoteForm.editFirstEntry.value) && isValidHour(editNoteForm.editFirstExit.value) && isValidHour(editNoteForm.editSecondEntry.value) && isValidHour(editNoteForm.editSecondExit.value)){
        saveEditedNote(noteId);
      } else{
        alert("Informe apenas horas válidas (hh:mm)");
      }
    }
  });

  toogleEditContent();
  reloadPage();
}

function removeNote(note){
  var noteId = note.parentNode.parentNode.getAttribute('data-unique-id');

  for(var i = 0; i < notes.length; i++){
    if(notes[i].id == noteId){
      if (window.confirm("Você realmente remover o registro na data "+formatDate(notes[i].date)+" ?")) {
        notes.splice(i,1);
        localStorage.setItem('notes', JSON.stringify(notes));
        addNotesToTable();
        break;
      }
    }
  }
  reloadPage();
}

function addNotesToTable(notes){

  if(!notes){
    notes = JSON.parse(localStorage.getItem('notes')) || [];
  }

  noteTableBody.innerHTML = '';

  for(var i = 0; i < notes.length; i++){
    var row = document.createElement('tr'),
    rowIdAttribute = document.createAttribute('data-unique-id'),
    dateCell = document.createElement('td'),
    firstEntryCell = document.createElement('td'),
    firstExitCell = document.createElement('td'),
    secondEntryCell = document.createElement('td'),
    secondExitCell = document.createElement('td'),
    totalCell = document.createElement('td'),
    actionsCell = document.createElement('td'),
    editButton = document.createElement('input'),
    removeButton = document.createElement('input');

    rowIdAttribute.value = notes[i].id;
    row.setAttributeNode(rowIdAttribute);

    editButton.type = 'button';
    editButton.value = 'Editar';
    editButton.classList = 'btn btn-primary h-margin-5';
    editButton.addEventListener('click', function(){
      editNote(this);
    });

    removeButton.type = 'button';
    removeButton.value = 'Remover';
    removeButton.classList = 'btn btn-danger h-margin-5';
    removeButton.addEventListener('click', function(){
      removeNote(this);
    });

    dateCell.appendChild(document.createTextNode(formatDate(notes[i].date)));
    firstEntryCell.appendChild(document.createTextNode(notes[i].firstEntry));
    firstExitCell.appendChild(document.createTextNode(notes[i].firstExit));
    secondEntryCell.appendChild(document.createTextNode(notes[i].secondEntry));
    secondExitCell.appendChild(document.createTextNode(notes[i].secondExit));
    totalCell.appendChild(document.createTextNode(notes[i].total));
    actionsCell.appendChild(editButton);
    actionsCell.appendChild(removeButton);

    row.appendChild(dateCell);
    row.appendChild(firstEntryCell);
    row.appendChild(firstExitCell);
    row.appendChild(secondEntryCell);
    row.appendChild(secondExitCell);
    row.appendChild(totalCell);
    row.appendChild(actionsCell);

    noteTableBody.appendChild(row);
  }
}

function saveEditedNote(noteId){
  var editNoteForm = document.getElementById('edit-note-form'),
      dateValue = editNoteForm.editNoteDate.value,
      dateArray = dateValue.split('-'),
      date = new Date(dateArray[0], parseInt(dateArray[1])-1, dateArray[2]);

  for(var i = 0; i < notes.length; i++){
    if(notes[i].id === noteId){

      notes[i].date = editNoteForm.editNoteDate.value;
      notes[i].dataString = date;
      notes[i].firstEntry = editNoteForm.editFirstEntry.value;
      notes[i].firstExit = editNoteForm.editFirstExit.value;
      notes[i].secondEntry = editNoteForm.editSecondEntry.value;
      notes[i].secondExit = editNoteForm.editSecondExit.value;
      notes[i].total = calculateTotalWorkedInDay(editNoteForm.editFirstEntry.value, editNoteForm.editFirstExit.value, editNoteForm.editSecondEntry.value, editNoteForm.editSecondExit.value);
      break;
    }
  }

  localStorage.setItem('notes', JSON.stringify(notes));

  alert("Registro editado com sucesso!");
  toogleEditContent();
  reloadPage();
}

function toogleEditContent(){
  var mainContent = document.getElementsByClassName('content')[0],
      editContent =  document.getElementsByClassName('edit-note')[0];

  if(editContent.classList.contains('hide')){
    editContent.classList.remove('hide');
    mainContent.classList.add('hide');
  } else{
    editContent.classList.add('hide');
    mainContent.classList.remove('hide');
  }
}

function calculateTotalWorkedAllTheTime(notes){

  totalWorkedHours.innerHTML = '';

  var hours = 0,
      minutes = 0,
      total;

  for(var i = 0; i < notes.length; i++){
    var hour = notes[i].total.split(':');

    hours += parseInt(hour[0], 10);
    minutes += parseInt(hour[1], 10);

    if(minutes >= 60){
      minutes -= 60;
      hours += 1;
    }
  }

  total = zeroLeft(hours) + ":" + zeroLeft(minutes);
  totalWorkedHours.appendChild(document.createTextNode(total));
}

function isEmpty(value){
  if(value === '' || value === undefined || value === null){
    return true;
  }

  return false;
}

function isValidHour(value){
  var re =  /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;
  return re.test(value);
}
