'use strict';

// function isHoraValida( horario ) {
// 	var regex = new RegExp("^([0-1][0-9]|[2][0-3]):([0-5][0-9])$");
// 	return regex.exec( horario ) != null;
// }


(function(){

  // localStorage.clear();

  var notes = JSON.parse(localStorage.getItem('notes')) || [],
      searchBtn = document.getElementById('search-btn'),
      clearBtn = document.getElementById('clear-btn');

  backNoteBtn.addEventListener('click', toogleEditContent);
  searchBtn.addEventListener('click', searchBetweenDates);
  clearBtn.addEventListener('click', reloadPage);

  addNotesToTable();
  calculateTotalWorkedAllTheTime(notes);

  function searchBetweenDates(){
    var startDate = document.getElementById('start-date').value,
        endDate = document.getElementById('end-date').value;

    var startDateArray = startDate.split('-'),
        endDateArray = endDate.split('-');

    var start = new Date(startDateArray[0], parseInt(startDateArray[1], 10)-1, startDateArray[2]),
        end = new Date(endDateArray[0], parseInt(endDateArray[1], 10)-1, endDateArray[2]);

    var toDate,
        foundList = [];

    for(var i = 0; i < notes.length; i++){

      toDate = new Date(notes[i].dataString);

      if((toDate <= end && toDate >= start)){
        foundList.push(notes[i]);
      }
    }

    if(foundList.length != 0){
      addNotesToTable(foundList);

    } else{
      alert("Nenhum registro encontrado entre as datas informadas.");
    }
  }

})();
