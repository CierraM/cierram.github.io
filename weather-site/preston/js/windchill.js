function calculateWindchill(temp, speed) {


    
    if(temp <= 50 && speed > 3){
    let windChill = 35.74 + 0.6215 * temp -35.75 * Math.pow(speed, 0.16) + 0.4275 *temp * Math.pow(speed, .16);
    windChill = Math.round(windChill)
    document.getElementById('windChill').innerHTML = windChill
    }
    else{
        document.getElementById('windChillDiv').innerHTML = 'N/A'
        
    }
    }


//fetch weather data
function getWeather() {
    const appid = '0b209e7419e85240602a2b16775256c6';
    const prestonId = '5604473'
    let url = `https://api.openweathermap.org/data/2.5/weather?id=${prestonId}&appid=${appid}`
    
    fetch(url)
      .then((response) => response.json())
      .then((jsObject) => {
        
        let currently = jsObject.weather[0].main
        let temp = Math.round(parseFloat(jsObject.main.temp_max) * (9/5) - 459.67)
        let windchill = ""
        let humidity = jsObject.main.humidity
        let wind = jsObject.wind.speed

        //put desired values into an array
        let weatherValues = [currently, temp, windchill, humidity, wind]
        for (let i = 0; i < weatherValues.length; i++){
            let p = document.createElement('p')
            p.textContent = weatherValues[i]
        //create elements
            if (i == 1){
                let span = document.createElement('span')
                span.textContent = "° F"
                
                p.appendChild(span)
            }
            else if (i == 2){
               let span =  document.createElement('span')
               span.id = "windChill"
               p.id = "windChillDiv"
               p.appendChild(span)
               p.innerHTML += "° F"
            }
            else if (i == 3){
                p.textContent = weatherValues[i] + "%"
            }
            else if (i == 4){
                let span = document.createElement('span')
                span.id = "windSpeed"
                span.textContent = " mph"
                p.textContent = weatherValues[i]
                p.appendChild(span)
            }
            document.getElementById('weather-values').appendChild(p)
        }
        calculateWindchill(temp, wind)


        //fetch data for 5 day forecast
        let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?id=5604473&appid=0b209e7419e85240602a2b16775256c6`
        fetch(forecastURL)
            .then((response) => response.json())
            .then((jsObject) =>{
             //put desired items into arrays                   
                let dates = [] 
                let icons = []
                let temps = []
                let src = []
                for (let i = 0; i < jsObject.list.length; i++){
                    currentObject = jsObject.list[i]
                    if (currentObject.dt_txt.includes("18:00:00")){ //we only want the data from 6:00PM

                        iconNumber = currentObject.weather[0].icon
                        icons.push(`https://openweathermap.org/img/wn/${iconNumber}@2x.png`) // the code for weather icon
                        
                        temps.push((Math.round(parseFloat((currentObject.main.temp)) * (9/5) -459.67)) + "° F") //a temperature
                        src.push(currentObject.weather[0].main)
                        let day = currentObject.dt_txt.split(" ")
                        day = day[0].split("-")
                        const date = new Date()
                        date.setFullYear(day[0])
                        date.setMonth(day[1] - 1)
                        date.setDate(day[2])
                        let dayOfWeek = date.getDay()
                        
                        let weekday = new Array(7);
                        weekday[1]="Monday";
                        weekday[2]="Tuesday";
                        weekday[3]="Wednesday";
                        weekday[4]="Thursday";
                        weekday[5]="Friday";
                        weekday[6]="Saturday";
                        weekday[0]="Sunday";

                        dates.push(weekday[dayOfWeek])
                        
                }
                        
                }
                for (let i = 0; i < dates.length; i++){
                   p = document.createElement('p')
                   p.innerHTML = dates[i]
                   document.getElementById('forecast-table').appendChild(p)

                }
                for (let i = 0; i < icons.length; i++){
                    img = document.createElement('img')
                    img.setAttribute('src', icons[i])
                    img.setAttribute('alt', src[i])
                    document.getElementById('forecast-table').appendChild(img)
                }
                for (let i = 0; i < temps.length; i++){
                    p = document.createElement('p')
                    p.innerHTML = temps[i]
                    document.getElementById('forecast-table').appendChild(p)
                }
            })
      });
}





getWeather()
