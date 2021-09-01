
function main() {
    addSkills();
    copyright();
}

//adds list of skills to document
function addSkills(){
    const ul = document.querySelector('#skills ul')
    skills.forEach(skill => {
        let li = document.createElement('li');
        li.textContent = skill;

        ul.appendChild(li);
    })
}

//adds copyright information with correct time to the footer
function copyright(){
    let date = new Date;
    date = date.getFullYear();

    copyright = `&copy; ${date} Cierra Morris`
    document.getElementById('copyright').innerHTML = copyright;
}


main();
