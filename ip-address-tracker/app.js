// API key: at_ShD7kpDevrMAP3qgOAGAQeq9rdl0O
// mapbox token: pk.eyJ1IjoiY2llcnJhbSIsImEiOiJja2VtMmNnMnMwZnMwMzBxbXl6ZGQ3amlhIn0.2HM4UVFAYu1-iJAMeZN49Q

//if the user clicks enter, button is clicked.
let input = document.getElementById('input');
input.addEventListener('keyup', function(event) {
    
    if (event.keyCode == 13) {
        
        event.preventDefault();
        getLocation()
    }
})

const apiKey = "at_ShD7kpDevrMAP3qgOAGAQeq9rdl0O";
const mapboxToken = "pk.eyJ1IjoiY2llcnJhbSIsImEiOiJja2VtMmNnMnMwZnMwMzBxbXl6ZGQ3amlhIn0.2HM4UVFAYu1-iJAMeZN49Q";
let i = 1
function getLocation() {
    
    let ipAddress = document.getElementById('input').value;
    const url = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipAddress}`

    if (!ipAddress) { 
        ipAddress = ""
    }
        fetch(url)
    
            .then(response => response.json())

            .then(data => {
                

                
                    //fill in text content
                    let ipAddress = data.ip
                    let city = data.location.city
                    let state = data.location.region
                    let zip = data.location.postalCode
                    let timezone = data.location.timezone
                    let isp = data.isp
                    document.getElementById('ipAddress').textContent = ipAddress;
                    document.getElementById('location').textContent = `${city}, ${state} ${zip}`
                    document.getElementById('timezone').textContent = `UTC${timezone}`;
                    document.getElementById('isp').textContent = isp;


                    // get the correct map
                    let lat = data.location.lat
                    let lon = data.location.lng
     
                    if (i === 1){
                        mymap = L.map('mapid').setView([lat, lon], 13);
                        i++
                    }

                    else{
    
                    mymap.setView(new L.LatLng(lat, lon));
                    }

                    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                        maxZoom: 18,
                        id: 'mapbox/streets-v11',
                        tileSize: 512,
                        zoomOffset: -1,
                        accessToken: 'pk.eyJ1IjoiY2llcnJhbSIsImEiOiJja2VtMmNnMnMwZnMwMzBxbXl6ZGQ3amlhIn0.2HM4UVFAYu1-iJAMeZN49Q'
                    }).addTo(mymap);
                    let marker = L.marker([lat, lon],
                        {
                            color: 'black',
                            fillColor: 'black',
                            
                        }).addTo(mymap);

                
                

           





            });

     
}

function invalid() {
    console.log('invalid ip address')
    document.getElementById('results').innerHTML = "<p class=\"result\">Invalid IP address. Sorry, please try again.</p>"
    
}