const root = document.getElementById('root');
root.style.height = "170px";

const shuffle = () => {
    //intialize values
    const colors = ["010026","080874","1455AC","1876C1","10B2E9"];

    let topDistance = 0;
    let leftDistance = 0;
    let leftDistanceDelayed = 0;
    const width = root.offsetWidth;
    const animationDuration = 600;
    
    //set divisions based on screen width
    let boundary
    if (window.innerWidth <= 420) {
        boundary = 110
    } else {
        boundary = 170
    }
    
    root.innerHTML = '';

    //move cards down and out
    function dealCard(card) {
        setTimeout(() => { //move down
            
            card.style.top = `${top}px`;
            leftDistance += boundary;
            if (leftDistance + boundary > width) {
                leftDistance = 0;
                topDistance += boundary;
            }
            root.style.height = `${top + boundary}px`; //make sure the root element is tall enough to hold everything
            card.style.top = `${topDistance}px`;
        }, 0)

        setTimeout(() => { //move right
            
            card.style.left = `${leftDistanceDelayed}px`;
            leftDistanceDelayed +=  boundary;
            if (leftDistanceDelayed + boundary > width) {
                leftDistanceDelayed = 0;
            }
        }, animationDuration / 2)
    }
    //move cards up and in back into the stack
    function putAwayCards(cards){
        Array.from(cards).forEach(card => {
            card.classList.add("up");
            setTimeout(() => {
                card.classList.add("in");
            }, animationDuration / 2)
            setTimeout(() => {
                card.parentElement.removeChild(card);
            }, animationDuration)
        })

        //delete info panel
        if (document.querySelector(".info-panel") !== null) {
            let button = document.querySelector(".info-panel");
            button.classList.remove('slideOut');
            button.classList.add('slideIn');
            setTimeout(() => {
                button.parentElement.removeChild(button);
            }, animationDuration / 2)
    
        }
    }

    //make buttons
    Object.keys(projects).forEach((key, index) => {
        const button = document.createElement('div');
        button.classList.add('grid-square');
        button.style.zIndex = index;
        let currentColor = `#${colors[index]}`;
        button.style.backgroundColor = currentColor;
        
        const p = document.createElement('p');
        p.textContent = key;
        button.appendChild(p);
        
        button.classList.add("transition");
        dealCard(button);
         

        //A function to bring in the middle layer of buttons
        function projectButtons() {
            
            //reset position values
            topDistance = 0;
            leftDistance = 0;
            leftDistanceDelayed = 0;

            //animate buttons away and delete them
            putAwayCards(document.querySelectorAll(".grid-square"))

            //replace with new buttons
            setTimeout(() => {
                let backButton = document.createElement("div");
                backButton.classList.add("grid-square");
                let close = document.createElement("p");
                backButton.classList.add('close');
                backButton.style.backgroundColor = currentColor;
                close.innerHTML = "&#8592; Back";
                backButton.appendChild(close);
                backButton.addEventListener("click", shuffle) //when you click the back button, it starts over with creating new root buttons
                root.appendChild(backButton);
                dealCard(backButton);
                projects[key].forEach(project => {
                    //create the link
                    const link = document.createElement('div');
                    link.style.backgroundColor = currentColor;
                    
                    //set attributes
                    link.textContent = project.name;
                    link.classList.add("grid-square");

                    //set final position
                    link.classList.add("transition");
                    dealCard(link);

                    // Replace button with info panel
                    link.addEventListener("click", () => {
                        //get rid of old buttons
                        // deleteButtons(animationDuration);
                        putAwayCards(document.querySelectorAll('grid-square'));

                        //add back button and info panel
                        setTimeout(() => {

                            let infoPanel = document.createElement("div");
                            infoPanel.classList.add("info-panel");
                            infoPanel.style.backgroundColor = currentColor;

                            let col1 = document.createElement("div");
                            col1.classList.add('info-panel-col1')

                            let backButton = document.createElement("div");
                            backButton.id = "backButton";
                            let close = document.createElement("p");
                            backButton.classList.add('back');
                            close.innerHTML = "&#8592; Back";
                            backButton.appendChild(close);
                            //when you click the back button, goes back to the previous set of buttons
                            backButton.addEventListener("click", projectButtons)
                            
                            let panelLink = document.createElement("a")
                            panelLink.href = project.url;
                            panelLink.classList.add("info-panel-link")
                            let img = document.createElement("img");
                            img.src = project.img
                            panelLink.appendChild(img);

                            col1.appendChild(backButton);
                            col1.appendChild(img);

                            let col2 = document.createElement("div");
                            col2.classList.add("info-panel-col2");

                            let name = document.createElement("h3");
                            name.textContent = project.name;
                            col2.appendChild(name)

                            let description = document.createElement("p");
                            description.textContent = project.description;
                            col2.appendChild(description);

                            let prompt = document.createElement("a");
                            prompt.textContent = "Click here to see it!";
                            prompt.href = project.url;
                            col2.appendChild(prompt);

                            infoPanel.appendChild(col1);
                            infoPanel.appendChild(col2);
                            infoPanel.style.position = "absolute";
                            infoPanel.style.zIndex = 10;
                            
                            
                            root.appendChild(infoPanel);
                            
                            document.querySelector(".info-panel a").setAttribute("target", "_blank");
                            
                            setTimeout(() => { 
                                infoPanel.classList.add('slideOut');
                            }, 0)

                            root.style.minHeight = infoPanel.offsetHeight
                        }, animationDuration)
                        
                    })
                    

                    //append
                    root.appendChild(link);
                })
            }, animationDuration)

        }

        //onClicks
        button.addEventListener("click", projectButtons)
        //append 
        root.appendChild(button)



    })
    

}


//Don't start animation until user has scrolled to the cards
let options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  }

const observer = new IntersectionObserver(entries => {
        shuffle()
    
}, options)

observer.observe(root);

shuffle()
