var todaysDate = moment().format("D/MM/YYYY");
var longitude;
var latitude;
var fetchWeatherUrl;
var searchHistory = [];
var superCity = "";
localStorage.setItem("userSearchHistory", JSON.stringify(searchHistory));
var getUserSearchHistoryEl = document.querySelector(".getUserSearchHistory");

function searchWeather() {
  
  //select city
  if(superCity === ""){
    // get city name from user
    var cityName = document.querySelector("#getCity").value;
    document.querySelector("#getCity").value = "";
    cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();

    // set default city
    if(cityName === ""){
       cityName = "Melbourne";
    }
  }
  else {
    cityName = superCity;
    superCity = "";
  }

  // fetch longitude and latitude values for that city
  var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=8ff30b172686b9cdb2a41bc28d4d766d';

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          longitude= data.coord.lon+"";
          latitude = data.coord.lat+"";
          fetchWeatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&units=metric&exclude=hourly,minutely,hourly,alerts&appid=8ff30b172686b9cdb2a41bc28d4d766d';
          if(! searchHistory.includes(cityName)){
            if(searchHistory.length >= 8){
              searchHistory.shift();
            }
            searchHistory.push(cityName);
            localStorage.setItem("userSearchHistory", JSON.stringify(searchHistory));
            populateSearchHistory();
          }
          

          fetch(fetchWeatherUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {

          // update data for current day
          document.querySelector(".currentDate").innerHTML = cityName+" ("+todaysDate+") "+setIcon(data.daily[0].weather[0].main);
          document.querySelector(".currentMaxTemp").textContent = "Max. Temprature: "+data.daily[0].temp.max+"°C";
          document.querySelector(".currentMinTemp").textContent = "Min. Temprature: "+data.daily[0].temp.min+"°C";
          document.querySelector(".currentHumidity").textContent = "Humidity: "+data.daily[0].humidity+"%";
          document.querySelector(".currentWindspeed").textContent = "Windspeed: "+data.daily[0].wind_speed+" MPH";
          document.querySelector(".currentUVIndex").textContent = data.daily[0].uvi;
          checkUVI(document.querySelector(".currentUVIndex"),data.daily[0].uvi);

          // update data for next 1st day
          var firstDayEl= document.querySelector(".dayOne");
         
          // change date
          firstDayEl.children[0].innerHTML = moment().add('1','d').format("D/MM/YYYY");
          // change icon according to the weather
          firstDayEl.children[1].innerHTML = setIcon(data.daily[1].weather[0].main);
          // change temprature
          firstDayEl.children[3].innerHTML = "Max. Temprature: "+data.daily[1].temp.max+"°C";
          firstDayEl.children[4].innerHTML = "Min. Temprature: "+data.daily[1].temp.min+"°C";
          //change humidity
          firstDayEl.children[5].innerHTML = "Humidity: "+data.daily[1].humidity+"%";

          // update datat for next 2nd day
          var secondDayEl= document.querySelector(".dayTwo");
          // change date
          secondDayEl.children[0].innerHTML = moment().add('2','d').format("D/MM/YYYY");
          // change icon according to the weather
          secondDayEl.children[1].innerHTML = setIcon(data.daily[2].weather[0].main);
          secondDayEl.children[3].innerHTML = "Max. Temprature: "+data.daily[2].temp.max+"°C";
          secondDayEl.children[4].innerHTML = "Min. Temprature: "+data.daily[2].temp.min+"°C";
          secondDayEl.children[5].innerHTML = "Humidity: "+data.daily[2].humidity+"%";

          // update datat for next 3rd day
          var thirdDayEl= document.querySelector(".dayThree");
          // change date
          thirdDayEl.children[0].innerHTML = moment().add('3','d').format("D/MM/YYYY");
          // change icon according to the weather
          thirdDayEl.children[1].innerHTML = setIcon(data.daily[3].weather[0].main);
          thirdDayEl.children[3].innerHTML = "Max. Temprature: "+data.daily[3].temp.max+"°C";
          thirdDayEl.children[4].innerHTML = "Min. Temprature: "+data.daily[3].temp.min+"°C";
          thirdDayEl.children[5].innerHTML = "Humidity: "+data.daily[3].humidity+"%";
        

          // update datat for next 4th day
          var forthDayEl= document.querySelector(".dayFour");
          // change date
          forthDayEl.children[0].innerHTML = moment().add('4','d').format("D/MM/YYYY");
          // change icon according to the weather
          forthDayEl.children[1].innerHTML = setIcon(data.daily[4].weather[0].main);
          forthDayEl.children[3].innerHTML = "Max. Temprature: "+data.daily[4].temp.max+"°C";
          forthDayEl.children[4].innerHTML = "Min. Temprature: "+data.daily[4].temp.min+"°C";
          forthDayEl.children[5].innerHTML = "Humidity: "+data.daily[4].humidity+"%";
          
          // update datat for next 5th day
          var fifthDayEl= document.querySelector(".dayFive");
          // change date
          fifthDayEl.children[0].innerHTML = moment().add('5','d').format("D/MM/YYYY");
          // change icon according to the weather
          fifthDayEl.children[1].innerHTML = setIcon(data.daily[5].weather[0].main);
          fifthDayEl.children[3].innerHTML = "Max. Temprature: "+data.daily[5].temp.max+"°C";
          fifthDayEl.children[4].innerHTML = "Min. Temprature: "+data.daily[5].temp.min+"°C";
          fifthDayEl.children[5].innerHTML = "Humidity: "+data.daily[5].humidity+"%";
          
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to GitHub');
    });
        });
      } else {
        alert('Please enter a valid city');
      }
    })
    .catch(function (error) {
      alert('Unable to connect to GitHub');
    });
  
  };


// populate search history
function populateSearchHistory(){
  searchHistory =  JSON.parse(localStorage.getItem("userSearchHistory"));
  

  // remove previous entries
    while (getUserSearchHistoryEl.firstChild) {
      getUserSearchHistoryEl.removeChild(getUserSearchHistoryEl.firstChild);
    }

    for(var i = (searchHistory.length - 1); i>= 0; i--){
      var buttonEl = document.createElement("button");
      buttonEl.setAttribute('class','cityBtn');
      buttonEl.innerHTML = searchHistory[i];
      var listEl = document.createElement("li");
      listEl.setAttribute('class','list-group-item');
      listEl.append(buttonEl);
      getUserSearchHistoryEl.append(listEl);
    }
}

function searchSelectedCity(event){
  event.preventDefault();
  var citySelectedEl = event.target;
 
  // check if the city is clicked
  if(citySelectedEl.matches("button") && citySelectedEl.classList.contains("cityBtn"))
  { 
    superCity = citySelectedEl.innerHTML;
    searchWeather();     
  }
}

// change background color of UV Index
function checkUVI(uviEl,UVI){
      if (UVI <=2){
        uviEl.style.backgroundColor = "Green";
      }
      else if( UVI <=5){
        uviEl.style.backgroundColor = "Yellow";
      }
      else if( UVI <=7){
        uviEl.style.backgroundColor = "Orange";
      }
      else if( UVI <=10){
        uviEl.style.backgroundColor = "Red";
      }
      else{
        uviEl.style.backgroundColor = "blue";
      }      
}

// set icon according to the weather
function setIcon(weather){
      if(weather === "Clear"){
        return '<i class="fas fa-sun"></i>';
      }
      else if(weather === "Clouds"){
          return '<i class="fas fa-cloud"></i>';
      }
      else if(weather === "Rain"){
          return '<i class="fas fa-cloud-rain"></i>';
      }
}

populateSearchHistory();
searchWeather();

document.querySelector(".searchWeather").addEventListener("click",searchWeather);

getUserSearchHistoryEl.addEventListener("click", searchSelectedCity);
