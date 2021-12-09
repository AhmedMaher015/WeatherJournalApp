/* Global Variables */

// for get data from user
const zip = document.getElementById("zip");
const cityName = document.getElementById("name");
const feelingInput = document.getElementById("feelings");

// submit button
const generateBtn = document.getElementById("generate");

// for put data on dom
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");
const error = document.querySelector(".error");

// Personal API Key for OpenWeatherMap API
const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "99bd103bb3913e9340a20696d6946de9&units=imperial";

//  check zip code input
const IsZipCorrect = () => {
  return zip.value.trim().length > 0;
};

//  check Feeling input
const IsFeelingInputCorrect = () => {
  return feelingInput.value.trim().length > 0;
};

// error
const makeError = (err) => {
  error.textContent = err;
};

/* Function called by event listener */
const submitHandler = () => {
  if (!IsFeelingInputCorrect() && !IsZipCorrect()) {
    makeError("Please, enter zipcode or feeling text");
    return;
  }

  // get temp api
  getTempData();
};

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();

// Event listener to add function to existing HTML DOM element
generateBtn.addEventListener("click", submitHandler);

/* Function to GET Web API Data*/
const getTempData = async () => {
  try {
    // clear error label
    error.innerHTML = "";
    const res = await fetch(`${API_URL}?zip=${zip.value}&appid=${API_KEY}`);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();

    // clear inputs
    zip.value = "";
    feelingInput.value = "";

    // post data when it ready
    await postProjectData(data);

    // get Project data
    await getProjectData();
  } catch (err) {
    makeError(err.message);
  }
};

/* Function to POST data */
const postProjectData = async (data) => {
  const res = await fetch("/postData", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      temp: data.main.temp,
      date: newDate,
      content: {
        ...data,
      },
    }),
  });
};

/* Function to GET Project Data */
const getProjectData = async () => {
  const res = await fetch("/getData", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  // put data in dom

  // city name
  cityName.innerHTML = `
    <h3>City: ${data.name}</h3>
  `;
  // temprature
  temp.innerHTML = `Temprature: ${data.temp}C.`;
  // date
  date.innerHTML = `Date: ${data.date}`;
  // weather decription
  content.innerHTML = `Description: ${data.content.weather[0].main}.`;
};
