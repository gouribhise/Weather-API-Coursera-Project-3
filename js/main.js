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
 
    var z = document.createElement("option");
    z.setAttribute("value", lines[i]);    
    var t = document.createTextNode(lines[i]);
    z.appendChild(t);
    z.addEventListener("click",(e)=>{
       console.log('clicked',e.target.value)
       WeatherAPI(e.target.value)
      })
   
    document.getElementById("mySelect").appendChild(z);
  }
}
 
}


function WeatherAPI(vals){
  console.log('what is valse',vals)
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

function formatDate(dt){
  console.log('what is dt:',dt)
  const year = dt.substring(0, 4);
  const month = dt.substring(4, 6);
  const day = dt.substring(6, 8);
  const date = new Date(`${year}-${month}-${day}`);
return date
}
function displayData(data){
  data.dataseries.forEach((item) => {
    console.log(item)
var dt=formatDate(item.date.toString())
var displayDate=dt.toString().substring(0,11)
console.log(displayDate)
var displayWeather=item.weather
var max=item.temp2m.max
var min=item.temp2m.min
 

  })
    
    
 

 
}
