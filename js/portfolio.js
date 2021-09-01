timing = 1; //in seconds, for animations

//items: a nodelist of squares in the portfolio grid
function placeItems(items) {
//initially position grid items

let container = document.querySelector('.portfolio-grid')
let containerWidth = container.offsetWidth;

let gridItemSize;
if (window.innerWidth > 420) {
    gridItemSize = 150;
} else {
    gridItemSize = 100;
}
const margin = 10;
const buffer = 80;

let numOfSquares = items.length;

//calculate height of container
let numOfRows = Math.ceil((gridItemSize * numOfSquares + (margin * 2) + buffer) / containerWidth);
document.querySelector('.portfolio-grid').style.height = `${numOfRows * gridItemSize + (numOfRows * margin)}px`;

//calculate number of columns
let numOfCols = Math.ceil(containerWidth /(gridItemSize + margin * 2));


//place items
let colLimit = 2 //how across a row we have placed the most recent item
let top = 0;
let left = 0;

items.forEach((item) => {
    item.style.top = top + 'px';
    item.style.left = left + 'px';

    //animation out controls
    let moveDown = false;
    let moveRight = false;
    let moveDownExists = false;

    if (top !== 0) {
        moveDown = true;
    }
    if (left !== 0) {
        moveRight = true;
    }
    if (moveDown && !moveRight) {
        item.style.animationName = `moveDown`;
        item.style.animationDuration = `${timing}s`;
        item.style.animationFillMode = "forwards";
        moveDownExists = true;
    } else if (!moveDown && moveRight) {
        item.style.animationName = `moveRight`;
        item.style.animationDuration = `${timing}s`;
        item.style.animationFillMode = "forwards";
        if (moveDownExists) {
            item.style.animationDelay = `${timing}s`;
        }
    } else if (moveDown && moveRight) {
        item.style.animationName = `moveDownRight`;
        item.style.animationDuration = `${timing * 2}s`;
        item.style.animationFillMode = "forwards";
    }

    if (colLimit >= numOfCols) { //We need to move down to a new row for the next one
        colLimit = 2
        top += gridItemSize + margin;
        left = 0;
    } else { //We don't need to move to a new row
        colLimit ++;
        left += gridItemSize + (margin * colLimit)/2;
    }
    
})
}

let parent = document.querySelector('.portfolio-grid');

let initialSquares = document.querySelectorAll('.grid-square')
//animate when scrolled into view
const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        placeItems(initialSquares)
    }
})

observer.observe(initialSquares[0]);




//create a list of project nodes
//category: a string that matches the project nodecategory in data.js ex. websites
function createProjectNodes(category){
    
    let projectSamples = projects[category];
    let nodes = [];
    projectSamples.forEach((project) => {
        let wrapper = document.createElement('div')
        wrapper.classList.add('grid-square');
        let content = document.createElement('p');
        content.textContent = project.name;
        wrapper.appendChild(content);
        nodes.push(wrapper);
    })
    return nodes;
}

function shuffleCards() {
    moveUpExists = false;
    let deck = document.querySelectorAll('.grid-square');
    deck.forEach((card) => {
        let moveUp = false;
        let moveLeft = false;

        if (card.style.top !== "0px") {
            moveUp = true;
        }
        if (card.style.left !== "0px") {
            moveLeft = true;
        }
        if (moveUp && !moveLeft) {
            card.style.animationName = `moveUp`;
            card.style.animationDuration = `${timing}s`;
            card.style.animationFillMode = "forwards";
            moveUpExists = true;
        
        } else if (!moveUp && moveLeft) {
            card.style.animationName = `moveLeft`;
            card.style.animationDuration = `${timing}s`;
            card.style.animationFillMode = "forwards";
            if (moveUpExists) {
                card.style.animationDelay = `${timing}s`;
            }
            
        } else if (moveUp && moveLeft) {
            card.style.animationName = `moveUpLeft`;
            card.style.animationDuration = `${timing * 2}s`; 
            card.style.animationFillMode = "forwards";
        } 
    })
}

document.querySelector('#websites').addEventListener('click', shuffleCards);

