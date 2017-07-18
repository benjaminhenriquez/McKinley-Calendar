
var eventForm, arrayForm;

eventForm = document.querySelector("#eventForm")
eventForm.addEventListener("submit", function(e){
  e.preventDefault()
  var name = e.target.name.value
  var startTime = e.target.startTime.value
  var endTime = e.target.endTime.value

  createEvent(name, startTime, endTime);
}, false)


arrayForm = document.querySelector("#arrayForm")
arrayForm.addEventListener("submit", function(e){
  e.preventDefault()
  var array = e.target.eventArray.value
  array = JSON.parse(array)
  mergeArrays(array);

}, false)



function createEvent(name,startTime,endTime){
  var object = {};
  object.name = name;
  object.startTime = startTime;
  object.endTime = endTime;

  seedData.push(object);
  addToCalendar(seedData);
}

function mergeArrays(array){

  if(Array.isArray(array)){
    console.log(array)
    seedData = seedData.concat(array);
      addToCalendar(seedData);

  }

}
