//https://www.codingnepalweb.com/weather-app-project-html-javascript/
const locButton=document.querySelector(".current-city");
const cityInput=document.querySelector(".input-btn");
const mainCard=document.querySelector(".current");
const searchBtn=document.querySelector(".city-search");
console.log(searchBtn);
const card=document.querySelectorAll(".card");
console.log(card);

//api key 
var lat,lon;
const API_KEY="0a6b3a6a10cabd9333308e4bd15e568e";


function success(pos) {
    const crd = pos.coords;

    console.log("Your current position is:");

    lat=crd.latitude;
    lon=crd.longitude;
  
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    fetchWeather('',lat,lon);

}

function error(err) {
    alert("Error in Finding Location")
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

 

const getEnteredCityWeather = () => {
    const cityName = cityInput.value.trim();
    if (cityName === "") return;
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
    
    // Get entered city coordinates (latitude, longitude, and name) from the API response
    fetch(API_URL).then(response => response.json()).then(data => {
        if (!data.length) return alert(`No coordinates found for ${cityName}`);
        const {lat, lon, name} = data[0];
        fetchWeather(name,lat,lon);
    }).catch(() => {
        alert("An error occurred while fetching the coordinates!");
    });
}
const getCurrentPositionWeather = () => 
{
    if('geolocation' in navigator)
    {
        navigator.geolocation.getCurrentPosition(success, error);
        
    }
    else
    {
        alert('geolocation not supported')
    }
}






function updateMainCard(info)
{

    let imgName;
    imgName=info.list[0].weather[0].main.toLowerCase();
    let city=info.city.name+','+info.city.country;
    let date=info.list[0].dt_txt.slice(0,10);
    let temp=Math.floor(info.list[0].main.temp);
    let vis=info.list[0].visibility;
    let hum=info.list[0].main.humidity;
    let wind=info.list[0].wind.speed;

    mainCard.innerHTML=`<h3>${city.toUpperCase()} (${date})</h3>
   <br>
    <img src="assets/${imgName}.png" alt="weather-img height="20%" width="40%"" >
                        <h6>Temperature: ${temp}&degC</h3>
                        <h6>Wind: ${wind} kmph</h3>
                        <h6>Visibility: ${vis}</h6>
                        
                        <h6>Humidity: ${hum}</h6>`
                        
    
}
function updateSubCards(info,index)
{
    let imgName;
    imgName=info.list[index].weather[0].main.toLowerCase();

    
    let date=info.list[index].dt_txt.slice(0,10);
    let temp=Math.floor(info.list[index].main.temp);
    let vis=info.list[index].visibility;
    let hum=info.list[index].main.humidity;
    let wind=info.list[index].wind.speed;

    card[index-1].innerHTML=`<h4>${date}</h3>
    <img src="assets/${imgName}.png" alt="weather-img height="30%" width="60%"" >
   
                        <h6>Temperature: ${temp}&degC</h3>
                        <h6>Wind: ${wind} kmph</h3>
                        <h6>Visibility: ${vis}</h6>
                        
                        <h6>Humidity: ${hum}</h6>
                     



                      
                        `
    


}
function updateWeather(data)
{
    updateMainCard(data);
    for(let i=1;i<6;i++)
    {
        updateSubCards(data,i);

    }

}

async function fetchWeather(city,lat,lon) {
    try {
            
      const API_URL=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=6&appid=${API_KEY}&units=metric`;
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data);
      await updateWeather(data);
      

    } catch (error) {
      console.error('Error:', error);
    }
  }

locButton.addEventListener('click',getCurrentPositionWeather);
searchBtn.addEventListener('click',getEnteredCityWeather);


//javascript for displaying a spinner



`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Loading Spinner Example</title>
  <style>
    /* Styles for the spinner container */
    #spinner-container {
      display: none;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1000;
    }

    /* Styles for the spinner */
    #spinner {
      border: 8px solid rgba(0, 0, 0, 0.3);
      border-top: 8px solid #3498db;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
</head>
<body>

  <!-- Spinner container -->
  <div id="spinner-container">
    <!-- Spinner element -->
    <div id="spinner"></div>
  </div>

  <!-- Your content goes here -->

  <script>
    // Function to show the spinner
    function showSpinner() {
      document.getElementById('spinner-container').style.display = 'block';
    }

    // Function to hide the spinner
    function hideSpinner() {
      document.getElementById('spinner-container').style.display = 'none';
    }

    // Simulating content loading
    function simulateContentLoading() {
      // Show the spinner
      showSpinner();

      // Simulate a delay (e.g., AJAX request, fetching data)
      setTimeout(function() {
        // Hide the spinner when content is loaded
        hideSpinner();
        // Your content loading logic goes here
      }, 2000); // Adjust the timeout as needed
    }

    // Call the function to simulate content loading
    simulateContentLoading();
  </script>
</body>
</html>
`



