
function start(){
getText("./city_coordinates.csv");
let file1;
async function getText(file) {
  let myObject = await fetch(file); 
  file1=await myObject.text();
  const lines = file1.split(/\r\n|\n/);

  var x = document.createElement("SELECT");
  x.setAttribute("id", "mySelect");
  options.appendChild(x);

  for(let i=1;i<lines.length;i++){
    var details=lines[i].split(',')
    var city=details[2]+', '+details[3]

    var z = document.createElement("option");
    z.setAttribute("value", lines[i]);    

    //to display city names in dropdown
    var t = document.createTextNode(city);
    z.appendChild(t);

    //will get called when user click on city name
    z.addEventListener("click",(e)=>{
       console.log('clicked',e.target.value)
       WeatherAPI(e.target.value)

       //clear previous displayed data
       var weatherDisplay=document.querySelector('#display_weather')
       weatherDisplay.innerHTML=''
      })
   
    document.getElementById("mySelect").appendChild(z);
  }
}
 
}

//get weather icon
function getWeatherIcon(weatherCondition) {
  // Define a mapping of weather conditions to icon images
  const iconMap = {
    "clear": "./images/clear.png",
    "pcloudy":"./images/pcloudy.png",
    "mcloudy": "./images/mcloudy.png",
    "cloudy": "./images/cloudy.png",
    "rain": "./images/rain.png",
    "humid": "./images/humid.png",
    "ishower": "./images/ishower.png",
    "lightrain": "./images/lightrain.png",
    "oshower": "./images/oshower.png",
    "snow": "./images/snow.png",
    "lightsnow": "./images/lightsnow.png",
    "ts": "./images/ts.png",
    "rainsnow": "./images/rainsnow.png",
    
  };

  // Get the corresponding icon URL for the weather condition
  return iconMap[weatherCondition] || "N/A"; // Return a default icon URL if condition not found
}

//get weather type
const weatherTypeMapping = {
  clear: "Clear",
  pcloudy: "Partially cloudy",
  mcloudy: "Mostly cloudy",
  cloudy: "Cloudy",
  rain: "Rain",
  humid: "Humid",
  ishower: "Shower",
  lightrain: "Light rain",
  oshower: "Occasional shower",
  snow: "Snow",
  lightsnow: "Light snow",
  ts: "Thunderstorm",
  rainsnow: "Rain and snow",
};


//calling weather api
async function WeatherAPI (vals){
 
  var values=vals.split(',')
  var longitude=values[0]
  var latitude=values[1]
  const url = `https://www.7timer.info/bin/civillight.php?lon=${longitude}&lat=${latitude}&ac=0&unit=metric&output=json&tzshift=0`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
  
     displayData(data)
     });
}


//format date
function formatDate(dt){  
  const year = dt.substring(0, 4);
  const month = dt.substring(4, 6);
  const day = dt.substring(6, 8);
  const date = new Date(`${year}-${month}-${day}`);
  return date
}


//main function to display data on page
function displayData(data){
 
  data.dataseries.forEach((item,index) => {
    
    //display date
    var dt=formatDate(item.date.toString())
    var displayDate=dt.toString().substring(0,11)

    //icon
    var weatherIcon=getWeatherIcon(item.weather)

 
    //weather type
    var displayWeather=weatherTypeMapping[item.weather]

    //max and min
    var max=item.temp2m.max
    var min=item.temp2m.min
 
    var weatherDisplay=document.querySelector('#display_weather')
    let weatherForecastHTML = '<div class="row">';

    //for first item in data
      if(index===0){
          weatherForecastHTML = `
              <div class="col-md-2 mb-4 disdata" >
                  <div class="card1" >
                      <div>
                         <h5 class="card-title">${displayDate}</h5>
                         <hr/>
                          <img src="${weatherIcon}" class="card-img-top" alt="Weather Icon" style="margin-right:20px">
                        <h5>${displayWeather}</h5>
                        <h6 class="card-text">H: ${max}°C</h6>
                        <h6 class="card-text">L: ${min}°C</h6>
                  </div>
              </div>
        </div>`
    weatherForecastHTML += '</div>';
  
   weatherDisplay.innerHTML += weatherForecastHTML;
      }
//for remaining items in data
      else{
   weatherForecastHTML = `
    <div class="col-md-2 mb-4 disdata" >
        <div class="cardall" >
            <div>
              <h5 class="card-title">${displayDate}</h5>
              <hr/>
              <img src="${weatherIcon}" class="card-img-top" alt="Weather Icon" style="margin-right:20px">
              <h5>${displayWeather}</h5>
              <h6 class="card-text">H: ${max}°C</h6>
              <h6 class="card-text">L: ${min}°C</h6>
           </div>
        </div>
    </div>`
    weatherForecastHTML += '</div>';

    weatherDisplay.innerHTML += weatherForecastHTML;
}

 

  })
    
    
 

 
}
