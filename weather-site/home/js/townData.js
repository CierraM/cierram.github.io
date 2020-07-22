const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json'
fetch(requestURL)
.then(function (response) {
    return response.json();
})
.then(function (jsonObject) {
    
    const source = jsonObject["towns"];
    let towns = []

    j=0
    for (let i = 0; i < source.length; i++ ) {
        if (source[i].name == "Preston" || source[i].name == "Fish Haven" || source[i].name == "Soda Springs"){
            towns[j] = source[i]
            j++
            
    }}
    
    for (let i = 0; i < towns.length; i++ ) {
        let card = document.createElement('section');
        let div = document.createElement('div')
        let h2 = document.createElement('h2');
        let motto = document.createElement('p');
        let yearFounded = document.createElement('p');
        let population = document.createElement('p');
        let arf = document.createElement('p');
        let photo = document.createElement('img');
        
        div.classList.add('textDiv')
        h2.textContent = towns[i].name;
        motto.textContent = towns[i].motto;
        motto.classList.add('homemotto')
        yearFounded.textContent = `Year founded: ${towns[i].yearFounded}`;
        population.textContent = `Population: ${towns[i].currentPopulation}`;
        arf.textContent = `Annual Rain Fall: ${towns[i].averageRainfall} in.`;
        photo.setAttribute('src', 'images/' + towns[i].photo);
        photo.setAttribute('alt', towns[i].name);

        div.appendChild(h2)
        div.appendChild(motto)
        div.appendChild(yearFounded)
        div.appendChild(population)
        div.appendChild(arf)
        card.appendChild(div)
        card.appendChild(photo)
        card.classList.add('card')

        document.querySelector('div.cards').appendChild(card);
    
    
    }})