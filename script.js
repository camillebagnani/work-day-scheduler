// shorthand to wrap all the code in jQuery so that it runs only after everything in the DOM has loaded (the HTML)
$(function () {
  // Adds the current day in the format of Day of the Week, Month, Day
  var today = dayjs();
  $('#currentDay').text(today.format('dddd, MMMM D'));

  // Array of objects for each work hour on the scheduler
  // This allows us to dynamically call each hour
  var workHours = [
    {
      time: "9AM",
      id: "#hour-9",
      timeBlock: 9
    },
    {
      time: "10AM",
      id: "#hour-10",
      timeBlock: 10
    },
    {
      time: "11AM",
      id: "#hour-11",
      timeBlock: 11
    },
    {
      time: "12PM",
      id: "#hour-12",
      timeBlock: 12
    },
    {
      time: "1PM",
      id: "#hour-1",
      timeBlock: 13
    },
    {
      time: "2PM",
      id: "#hour-2",
      timeBlock: 14
    },
    {
      time: "3PM",
      id: "#hour-3",
      timeBlock: 15
    },
    {
      time: "4PM",
      id: "#hour-4",
      timeBlock: 16
    },
    {
      time: "5PM",
      id: "#hour-5",
      timeBlock: 17
    }];

  var saveButton = $(".container-lg");

  // Loops through the workHours array to assign the corresponding local storage and display it in the text area after refreshing
  function checkHour() {
    for (var i = 0; i < workHours.length; i++) {
      var saved = localStorage.getItem(workHours[i].time)
      $(workHours[i].id).children("textarea").text(saved);
      console.log(workHours[i])
      // Checks if the hour of each timeBlock is past, present or future
      // Adds relevant class (past, present or future) and removes irrelevant classes
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

  // Gives functionality to the save button
  saveButton.click(function (event) {
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("fas")) {
      var description;
      var currentWorkHour;
      // If a user clicks the button element with class "btn", it gets the value from the sibling with the class of "description"
      // currentWorkHour gets the hour of the button they clicked on and makes it the key for local storage
      if ($(event.target).hasClass("btn")) {
        description = $(event.target).siblings(".description").val();
        currentWorkHour = $(event.target).siblings(".hour").text();

      }
      // If a user clicks the icon of the button element with the class of "fas", it traverses the DOM to its parent's sibling with the class "description"
      // currentWorkHour traverses the DOM to get the parent's sibling with the class "hour", and gets the text from it and makes it the key for local storage
      if ($(event.target).hasClass("fas")) {
        description = $(event.target).parent().siblings(".description").val();
        currentWorkHour = $(event.target).parent().siblings(".hour").text();
      }
      // we send to local storage by passing in the dymanic key and value
      localStorage.setItem(currentWorkHour, description);
    }
  })
})