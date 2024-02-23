const pages = document.querySelectorAll(".selection > div");
const backButton = document.getElementById("backButton");
const nextButton = document.getElementById("nextButton");
const buttons = document.getElementsByClassName("buttons");
const noteInfo = document.getElementById("note-info");
const staffInfo = document.getElementById("belongtoStaff");
const serviceInfo = document.getElementById("belongtoService");
const dateInfo = document.getElementById("belongtoDate");
const notStaff = document.querySelector(".not-staff");
const notService = document.querySelector(".not-service");
const notDate = document.querySelector(".not-date");
const Alert = document.querySelector(".alert");
const Completed = document.querySelector(".completed");
const staffList = document.querySelector(".staff-list");
const serviceList = document.querySelector(".service-list");
const totalHours = document.querySelector(".total-hours");
const timeSlotDivs = document.querySelectorAll(".hour");
const moneyInfo = document.getElementById("belongtoMoney");

const staff = [
  {
    id: 1,
    name: "Alex Rosetta",
    email: "alexyrosetta@egmail.com",
    image: "staff-1.jpg",
  },
  {
    id: 2,
    name: "Maria July",
    email: "mariajuly@egmail.com",
    image: "staff-2.jpg",
  },
];

const services = [
  {
    id: 1,
    name: "Oral hygiene",
    image: "service-1.jpg",
    duration: "1 hour",
    price: 50.0,
  },
  {
    id: 2,
    name: "Implants",
    image: "service-2.jpg",
    duration: "1 hour 30 minutes",
    price: 120.0,
  },
  {
    id: 3,
    name: "Check up",
    image: "service-3.jpg",
    duration: "1 hour 12 minutes",
    price: 140.0,
  },
];

let currentPageIndex = 0;
const navItems = document.querySelectorAll("li");
const pageNumbers = document.querySelectorAll(".navbar .span");
let formattedDate = ""; // Declare formattedDate as a global variable

function showPage(index) {
  pages.forEach((page, pageIndex) => {
    if (pageIndex === index) {
      page.style.display = "block";
    } else {
      page.style.display = "none";
    }

    navItems.forEach((item, itemIndex) => {
      if (index === itemIndex) {
        item.style.color = "#53D56C";
        item.classList.remove("cursor");
      } else if (itemIndex <= index) {
        item.classList.remove("cursor");
        item.style.color = "#6C70DC";
      } else if (item.color !== "#53D56C") {
        item.style.color = "";
        item.classList.add("cursor");
      }
    });

    pageNumbers.forEach((pageItem, pageIndex) => {
      if (pageIndex === index) {
        pageItem.style.backgroundColor = "#53D56C";
        pageItem.classList.remove("cursor");
      } else if (pageIndex <= index - 1) {
        pageItem.style.backgroundColor = "#6C70DC";
        pageItem.innerHTML = `<i class="fa fa-check page-icon"></i>`;
      } else if (pageItem.style.backgroundColor != "#53D56C") {
        pageItem.classList.add("cursor");
      }
    });
  });

  if (index === 0) {
    backButton.style.display = "none";
    buttons[0].style.justifyContent = "flex-end";
  } else {
    backButton.style.display = "block";
    buttons[0].style.justifyContent = "space-between";
  }

  if (index === 3) {
    nextButton.innerText = "Confirm booking";
  } else {
    nextButton.innerText = "Next";
  }
}

backButton.addEventListener("click", () => {
  if (currentPageIndex > 0) {
    currentPageIndex--;
    showPage(currentPageIndex);
  }
});

notStaff.style.display = "none";
notService.style.display = "none";
notDate.style.display = "none";
Alert.style.display = "none";
Completed.style.display = "none";

function validateCurrentPage() {
  if (currentPageIndex === 0) {
    if (staffInfo.innerHTML.trim() === "") {
      notStaff.style.display = "block";

      setTimeout(() => {
        notStaff.style.display = "none";
      }, 3000);
      return false;
    }
  } else if (currentPageIndex === 1) {
    if (serviceInfo.innerHTML.trim() === "") {
      notService.style.display = "block";
      setTimeout(() => {
        notService.style.display = "none";
      }, 3000);

      return false;
    }
  } else if (currentPageIndex === 2) {
    const selectedTimeSlot = document.querySelector(".selected-hour");

    if (!selectedTimeSlot) {
      notDate.style.display = "block";
      setTimeout(() => {
        notDate.style.display = "none";
      }, 3000);
      return false;
    }
  } else if (currentPageIndex === 3 && Completed.style.display === "block") {
    nextButton.style.display = "none";
    backButton.style.display = "none";
  }

  return true;
}

let inputValuesArray = [];

nextButton.addEventListener("click", () => {
  if (validateCurrentPage()) {
    if (currentPageIndex === 3) {
      const inputs = document.querySelectorAll(".inputs input");
      let isAllInputsFilled = true;

      inputs.forEach((input) => {
        if (input.value.trim() === "") {
          isAllInputsFilled = false;
        } else {
          inputValuesArray.push(input.value);
        }
      });

      if (isAllInputsFilled) {
        Completed.style.display = "block";

        sendInput(inputValuesArray);
        currentPageIndex++;
        showPage(currentPageIndex);
      } else {
        Alert.style.display = "block";
      }
    } else {
      currentPageIndex++;
      showPage(currentPageIndex);
    }
  }
});
// h1.classList.add("transparent");
showPage(currentPageIndex);

staff.forEach((staffMember) => {
  const staffCard = document.createElement("div");
  staffCard.classList.add("staff-card");

  staffCard.innerHTML = `
    <img src="./assets/images/${staffMember.image}" alt="${staffMember.name}" class="image" />
    <div class="staff-info">  
        <div class="staff-name">${staffMember.name}</div>
        <div>${staffMember.email}</div>
    </div>
  `;

  staffCard.addEventListener("click", () => {
    staffInfo.innerHTML = ``;
    staffInfo.innerHTML = `
      <div><span class="to">Staff: </span>${staffMember.name}</div>
    `;
    sendStaff(staffMember.id);
    let selectedCards = document.querySelectorAll(".staff-card.selected");
    selectedCards.forEach((card) => {
      card.classList.remove("selected");
    });
    currentPageIndex++;
    showPage(currentPageIndex);
    staffCard.classList.add("selected");
  });

  staffList.appendChild(staffCard);
});

services.forEach((service) => {
  const serviceCard = document.createElement("div");
  serviceCard.classList.add("service-card");

  serviceCard.innerHTML = `
    <div class="service-container"> 
      <img src="./assets/images/${service.image}" alt="${
    service.name
  }" class="image" />
      <div class="staff-info">
          <div>${service.name}</div>
          <div>Duration: ${service.duration}</div>
      </div>
    </div>
    <div>
      <div class="price">${service.price.toFixed(0)}$</div>
    </div>
  `;

  serviceCard.addEventListener("click", () => {
    serviceInfo.innerHTML = `
      <div><span class="to">Service: </span> ${service.name}</div>
    `;
    moneyInfo.innerHTML = `
      <div><span class="to">Money: </span> ${service.price.toFixed(0)}$</div>
    `;
    sendService(service.id);
    let selectedCards = document.querySelectorAll(".service-card.selected");
    selectedCards.forEach((card) => {
      card.classList.remove("selected");
    });

    serviceCard.classList.add("selected");
    currentPageIndex++;
    showPage(currentPageIndex);
  });

  serviceList.appendChild(serviceCard);
});

const alertIcon = document.querySelector(".alert i");
const completedIcon = document.querySelector(".completed i");

alertIcon.addEventListener("click", () => {
  Alert.style.display = "none";
});

let complete = false;
completedIcon.addEventListener("click", () => {
  Completed.style.display = "none";
  resetSelectedData();
  complete = true;

  nav = 0;
  load();
});

let nav = 0;
let clicked = null;

const calendar = document.getElementById("calendar");
const date = document.querySelector(".date");
const time = document.querySelector(".time");

const dateArray = [
  "2023-08-04",
  "2023-08-05",
  "2023-08-06",
  "2023-09-04",
  "2023-09-05",
  "2023-09-06",
  "2023-10-04",
  "2023-10-05",
  "2023-10-06",
  "2023-11-04",
  "2023-11-05",
  "2023-11-06",
  "2023-12-04",
  "2023-12-05",
  "2023-12-06",
];

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

  document.getElementById("monthDisplay").innerText = `${dt.toLocaleDateString(
    "en-us",
    { month: "long" }
  )} ${year}`;

  calendar.innerHTML = "";

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement("div");
    daySquare.classList.add("day");

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      daySquare.addEventListener("click", () => {
        clicked = new Date(year, month, i - paddingDays);
        updateSelectedDate();
      });
    } else {
      daySquare.classList.add("padding");
    }

    calendar.appendChild(daySquare);
  }

  updateSelectedDate();
}

let selectedTime;
function updateSelectedDate(selectedTime) {
  const daySquares = document.querySelectorAll(".day");

  daySquares.forEach((daySquare) => {
    const day = parseInt(daySquare.innerText);

    if (!isNaN(day)) {
      const currentDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + nav,
        day
      );

      if (
        clicked !== null &&
        currentDate.toDateString() === clicked.toDateString()
      ) {
        if (![4, 5, 6].includes(currentDate.getDate())) {
          return;
        }

        daySquares.forEach((otherDaySquare) => {
          otherDaySquare.classList.remove("selected-day");
        });

        daySquare.classList.add("selected-day");

        formattedDate = formatDateISO(currentDate);
        sendDate(formattedDate);
        sendTime(selectedTime);
        date.innerHTML = formattedDate;

        dateInfo.innerHTML = `<div><span class="to">Date: </span>${formattedDate} / ${selectedTime}</div>`;

        if (currentDate.getDate() >= 4 && currentDate.getDate() <= 6) {
          totalHours.classList.add("active");
        } else {
          time.innerHTML = "";
        }
      } else {
        daySquare.classList.remove("selected-day");

        if (![4, 5, 6].includes(currentDate.getDate())) {
          daySquare.classList.add("grayed-out");
        } else {
          daySquare.classList.remove("grayed-out");
        }
      }
    }
  });
}

function formatDateISO(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function initButtons() {
  document.getElementById("nextButton1").addEventListener("click", () => {
    nav++;
    load();
  });

  document.getElementById("backButton1").addEventListener("click", () => {
    nav--;
    load();
  });
}

timeSlotDivs.forEach((timeSlotDiv) => {
  timeSlotDiv.addEventListener("click", () => {
    const selectedDay = document.querySelector(".selected-day");

    if (selectedDay) {
      const selectedDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + nav,
        parseInt(selectedDay.innerText)
      );

      formattedDate = formatDateISO(selectedDate);

      if (dateArray.includes(formattedDate)) {
        clearSelectedTimeSlots();
        timeSlotDiv.classList.add("selected-time");
      }
    }
  });
});

function clearSelectedTimeSlots() {
  const timeSlotDivs = document.querySelectorAll(".hour");
  timeSlotDivs.forEach((timeSlotDiv) => {
    timeSlotDiv.classList.remove("selected-time");
  });
}

const selectedData = {
  customer: {
    name: "",
    surname: "",
    email: "",
  },
  date: "",
  service_id: 0,
  staff_id: 0,
  time: "",
};

console.log(selectedData);
const sendStaff = (id) => {
  selectedData.staff_id = id;
};

const sendService = (id) => {
  selectedData.service_id = id;
};

const sendInput = (array) => {
  selectedData.customer = {
    name: array[0],
    surname: array[1],
    email: array[2],
  };
};

const sendDate = (date) => {
  selectedData.date = date;
};

const sendTime = (time) => {
  selectedData.time = time;
};

const selectedDay = document.querySelector(".date");
function resetSelectedData() {
  currentPageIndex = 0;
  showPage(currentPageIndex);
  staffInfo.innerHTML = "";
  serviceInfo.innerHTML = "";
  dateInfo.innerHTML = "";
  formattedDate = ""; // Reset formattedDate
  clearSelectedTimeSlots();
  clearPageStyles();
  resetNavbarIcons();

  const selectedStaffCard = document.querySelector(".staff-card.selected");
  if (selectedStaffCard) {
    selectedStaffCard.classList.remove("selected");
  }

  const selectedServiceCard = document.querySelector(".service-card.selected");
  if (selectedServiceCard) {
    selectedServiceCard.classList.remove("selected");
  }

  const inputs = document.querySelectorAll(".inputs input");
  inputs.forEach((input) => {
    input.value = "";
  });

  // Reset selectedDay
  if (selectedDay) {
    selectedDay.innerHTML = `<p>Select date</p>`;
  }

  // Reset selectedTime or hour
  hourElements.forEach((hourElement) => {
    hourElement.classList.remove("selected-hour");
    hourElement.classList.add("hour-deactive");
  });
}

function resetNavbarIcons() {
  pageNumbers.forEach((pageItem, pageIndex) => {
    if (pageIndex === 0) {
      pageItem.innerText = `1`;
    } else {
      pageItem.innerHTML = pageIndex + 1;
    }
    pageItem.style.backgroundColor = "";
  });
}

function clearPageStyles() {
  navItems.forEach((navItem) => {
    navItem.style.color = "";
  });

  pageNumbers.forEach((pageItem) => {
    pageItem.style.backgroundColor = "";
  });

  const daySquares = document.querySelectorAll(".day");

  daySquares.forEach((otherDaySquare) => {
    otherDaySquare.classList.remove("selected-day");
  });

  backButton.style.display = "none";
  buttons[0].style.justifyContent = "flex-end";
  nextButton.innerText = "Next";
}

const hourElements = document.querySelectorAll(".total-hours .hour");

hourElements.forEach((hourElement) => {
  hourElement.addEventListener("click", () => {
    selectedTime = hourElement
      .querySelector("p")
      .textContent.trim()
      .split("<br>")[0]
      .trim()
      .split(" ")[0];

    let selectedCards = document.querySelectorAll(
      ".total-hours .selected-hour"
    );
    selectedCards.forEach((card) => {
      card.classList.remove("selected-hour");
      card.classList.add("hour-deactive");
    });
    currentPageIndex++;
    showPage(currentPageIndex);

    hourElement.classList.remove("hour-deactive");
    hourElement.classList.add("selected-hour");
    updateSelectedDate(selectedTime);
    // timeDiv(selectedTime);
    // Do whatever you want with the selected time here
  });
});

initButtons();
load();
// timeDiv();
