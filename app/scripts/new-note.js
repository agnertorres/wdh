'use strict';

(function(){

  var newNoteBtn = document.getElementById('new-note-btn'),
      form = document.getElementById('new-note-form'),
      noteInputs = document.getElementsByClassName('note-input'),
      notes = JSON.parse(localStorage.getItem('notes')) || [];

  newNoteBtn.addEventListener('click', function(){
    if(isEmpty(form.noteDate.value) || isEmpty(form.firstEntry.value) || isEmpty(form.firstExit.value) || isEmpty(form.secondEntry.value) || isEmpty(form.secondExit.value)){
      alert("Todos os campos são obrigatórios.");

    } else{

      if(isValidHour(form.firstEntry.value) && isValidHour(form.firstExit.value) && isValidHour(form.secondEntry.value) && isValidHour(form.secondExit.value)){
        insertNewNote();
      } else{
        alert("Informe apenas horas válidas (hh:mm)");
      }
    }
  });

  for(var i=0; i < noteInputs.length; i++){
    VMasker(noteInputs[i]).maskPattern('99:99');
  }

  function insertNewNote(){
    var dateValue = form.noteDate.value,
        dateArray = dateValue.split('-'),
        date = new Date(dateArray[0], parseInt(dateArray[1])-1, dateArray[2]);

    var newNote = {
      id: generateUniqueID(),
      date: form.noteDate.value,
      dataString: date,
      firstEntry: form.firstEntry.value,
      firstExit: form.firstExit.value,
      secondEntry: form.secondEntry.value,
      secondExit: form.secondExit.value,
      total: calculateTotalWorkedInDay(form.firstEntry.value, form.firstExit.value, form.secondEntry.value, form.secondExit.value)
    };

    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));

    alert("Novo registro adicionado para a data: "+ formatDate(newNote.date));

    form.noteDate.value = '';
    form.firstEntry.value = '';
    form.firstExit.value = '';
    form.secondEntry.value = '';
    form.secondExit.value = '';
  }

  function generateUniqueID() {
    function g() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return g() + g() + g() + g() + g() + g() + g() + g();
  }
})();
