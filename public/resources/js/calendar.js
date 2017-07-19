//seed data to populate calendar from start

var seedData = [
  {name: "Call Mom",
  startTime: "12:30 pm",
  endTime: "1:30 pm" },
  {name: "Walk Dog",
  startTime: "8:30 am",
  endTime: "9:00 am"},
  {name:"Eat Lunch" ,
  startTime: "12:00 pm",
  endTime: "12:30 pm"},
  {name: "Pick up Dinner",
  startTime: "5:00 pm" ,
  endTime: "6:30 pm"},
  {name: "Movie",
  startTime: "7:30 pm" ,
  endTime: "9:30 pm"},
  {name: "Breakfast",
  startTime: "9:30 am" ,
  endTime: "10:30 am"}
];

var counter = seedData.length;

//functions that are executed when page is loaded
createCalenderHTML();
addToCalendar(seedData);

// Functions


//Creates the calendar
function createCalenderHTML(){

  document.querySelector(".calendarDay").innerHTML = (function(){
    var array = [];

    function timeSlots(array,am_pm){

      var div1 = "<div class='row hour'><div class='col span-1-of-10 time slot'>"
      var div2 = "</div><div class='col span-9-of-10 box slot'></div></div>"

      for(var i = 0; i<12; i++){

        let time;
        let time2;

        if(i === 0){
          time = 12 + ':00' + am_pm
          time2 = 12 + ':30'
          array.push( div1 + time + div2)
          array.push( div1 + time2 + div2)
        }
        else if( i > 0){
          time = i + ':00' + am_pm
          time2 = i + ':30'
          array.push( div1 + time + div2)
          array.push( div1 + time2 + div2)
        }
      }
    }

    timeSlots(array, "am");
    timeSlots(array, "pm");

    return array.join('');

  })();

  var timeArray = document.querySelectorAll(".hour");

  timeArray.forEach(function(row, i){
    row.id = "" + i;

    if(i%2 === 0){
      row.style.fontSize = "18px"
    }
  });

}

//Adds events to calendar

function addToCalendar(eventsArray){

  eventsArray.forEach(function(eventObj,index){
    var name = eventObj.name
    var startSlot = parseInt(time(eventObj.startTime),10);
    var endSlot = parseInt(time(eventObj.endTime),10);
    var slot;

    for(var i = startSlot; i < endSlot; i++){
      id = ""+i
      slot = document.getElementById(id).querySelector(".box");
      slot.classList.add("on");

      if(i === endSlot-1 && i === startSlot){
        slot.innerHTML = "<div><p>" + name + "</p></div>"
        slot.style.padding = "0px"
        slot.style.borderTopStyle = "solid"
        slot.style.borderBottomStyle = "solid"
        slot.style.borderTopWidth = "0.5px"
        slot.style.borderBottomWidth = "0.5px"
      }
      else if(i === startSlot){
        slot.innerHTML = "<p>" + name + "</p>"
        slot.style.padding = "0px"
        slot.style.borderTopStyle = "solid"
        slot.style.borderTopWidth = "0.5px"
      }
      else if(i === endSlot-1){
        slot.style.borderBottomStyle = "solid"
        slot.style.borderBottomWidth = "0.5px"
        slot.innerHTML = "<div></div>"
      }
      else{
        slot.innerHTML = "<div></div>"
      }
    }
  })

}

//parses time string into usable data to calculate time

function time(time){

  var array =time.split(/[ :]+/);
  var hour = array[0];
  var half = array[1];
  var am_pm = array[2];
  var id;

  if(hour === "12"){

    if(am_pm === "am"){

      if(half === "00"){
        return "0"
      }
      else {
        return"1"
      }
    }
    else{
      if(half === "00"){
        return "24"
      }
      else{
        return "25"
      }
    }
  }

  else{

    id = parseInt(hour, 10) * 2;

    if(am_pm === "pm"){
      id = id + 24
      if(half === "30"){
        id = id + 1
      }
    }
    else{
      if(half === "30"){
        id = id + 1
      }
    }
  }

  return id + ""

}
