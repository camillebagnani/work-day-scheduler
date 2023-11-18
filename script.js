// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var today = dayjs();
$('#currentDay').text(today.format('dddd, MMMM D'));

var workHours = [
  {
    time: "9AM",
    id: "#hour-9",
    timeBlock: 8
  },
  {
    time: "10AM",
    id: "#hour-10",
    timeBlock: 9
  },
  {
    time: "11AM",
    id: "#hour-11",
    timeBlock: 10
  },
  {
    time: "12PM",
    id: "#hour-12",
    timeBlock: 11
  },
  {
    time: "1PM",
    id: "#hour-1",
    timeBlock: 12
  },
  {
    time: "2PM",
    id: "#hour-2",
    timeBlock: 13
  },
  {
    time: "3PM",
    id: "#hour-3",
    timeBlock: 14
  },
  {
    time: "4PM",
    id: "#hour-4",
    timeBlock: 15
  },
  {
    time: "5PM",
    id: "#hour-5",
    timeBlock: 16
  }];

var saveButton = $(".container-lg");

function checkHour() {
  for (var i = 0; i < workHours.length; i++) {
    var saved = localStorage.getItem(workHours[i].time)
    $(workHours[i].id).children("textarea").text(saved);
    console.log(workHours[i])

    if (workHours[i].timeBlock === dayjs().hour()) {
      $(workHours[i].id).addClass("present").removeClass("past future")
    } else if (workHours[i].timeBlock < dayjs().hour()) {
      $(workHours[i].id).addClass("past").removeClass("present future")
    } else if (workHours[i].timeBlock > dayjs().hour()) {
      $(workHours[i].id).addClass("future").removeClass("present past")
    }
  }
}

checkHour();

saveButton.click(function (event) {
  event.preventDefault();
  if ($(event.target).hasClass("btn") || $(event.target).hasClass("fas")) {
    var description;
    var currentWorkHour;
    if ($(event.target).hasClass("btn")) {
      description = $(event.target).siblings(".description").val();
      currentWorkHour = $(event.target).siblings(".hour").text();

    }
    if ($(event.target).hasClass("fas")) {
      description = $(event.target).parent().siblings(".description").val();
      currentWorkHour = $(event.target).parent().siblings(".hour").text();
    }
    localStorage.setItem(currentWorkHour, description);
    console.log(currentWorkHour)
  }
})




$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
// });



//   var now = today.format('HH:mm:ss');
//   console.log("the time is " + now);

//   setInterval(currentTime, 1000);
//   function currentTime() {
//     now;
  })
