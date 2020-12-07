// example of local storage array:
// {
//     listItems: [
//         {
//           checked: true;
//            content: 'do stuff' ,
//         },
//     ]
// }


function loadData(){
    items = localStorage.getItem('listItems'); 
    
    if (!items) {
        // console.log("Didn't find listitems in storage")
        return [];
    }
    
    else {
        // console.log("Found listItems in storage");
        // console.log(`List items found: ${items}`)
        return JSON.parse(items);
    }
}

//takes the array and replaces the one in local storage
function saveToStorage(array){
    // console.log(JSON.stringify(array)) looks okay
    window.localStorage.setItem('listItems', JSON.stringify(array));
    // console.log(window.localStorage.getItem('listItems'))
}


let listItems = loadData();
populateList();

//take items from array and render them to the screen
function populateList(){
    listItems.map( (currentValue, index)=>{
        // console.log(currentValue)
        createItem(currentValue);
    })
}

//add a new item to the list, including a classname and placeholder to match the number on the list it is.
function createNewItem(){
    let  newItem = {
        content: '',
        checked: false,
        id: Math.floor(Math.random() * 100000000000000)
    }
    
    listItems.push(newItem);
    saveToStorage(listItems)
    // console.log(newItem)
    createItem(newItem);
    
}

//creates elements to place into html, fills in content
function createItem(newItem){
    let li = document.createElement('li');
    li.classList.add('to-do-list__item');

    let label = document.createElement('label');
    label.setAttribute('for', newItem.id);

    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', `check${newItem.id}`);
    checkbox.setAttribute('tabindex', '-1')
    if (newItem.checked){
        checkbox.setAttribute('checked', 'checked');
    }

    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', "To do...");
    input.setAttribute('id', newItem.id);
    if (newItem.content){
        input.value = newItem.content;
    }

    label.appendChild(checkbox);
    label.appendChild(input);
    li.appendChild(label);
    document.getElementById('to-do-list__items').appendChild(li);

    listenForInput()
}
//listen for click on + button, call createItem
document.getElementById('plus').addEventListener('click', createNewItem)

//adds event listener to listen for changes in the textboxes
function listenForInput(){

//save text to the correct position in listItems when focus is taken off the input
document.querySelectorAll('input[type="text"]').forEach(item => {
    item.addEventListener('blur', (e) => {
        let inputId = e.target.id;

        let index = findIndexOfId(listItems, inputId);
        listItems[index].content = e.target.value;
        // console.log(listItems);
        saveToStorage(listItems);
    })})
}

//save checked whenever the checkbox is clicked
document.querySelectorAll('input[type="checkbox"]').forEach(item => {
    console.log("I am a checkbox")
    item.addEventListener('click', (e) => {
        console.log(e.target.checked)
        let checkedId = parseInt(e.target.id.split('check')[1]);  //problems with the right id appearing
        let checkedIndex = findIndexOfId(listItems, checkedId);

        console.log(checkedIndex)

        if (e.target.checked){
            listItems[checkedIndex].checked = true;
        }
        else {
            listItems[checkedIndex].checked = false;
        }
        saveToStorage(listItems);
    })
})

function findIndexOfId(array, id){
    let num
    array.forEach((item, index) => {
        if (item.id == id){
            num = index
        }
    })
    return num;
}

//reset storage and list when reset button is clicked
function reset(){
    listItems = [];
    localStorage.clear();
    document.getElementById('to-do-list__items').innerHTML = '';
}

document.getElementById('clearCheckedBtn').addEventListener('click', clearChecked);

//clear checked items only off the screen and remove from memory
function clearChecked(){
    
    let array = document.querySelectorAll('input[type="checkbox"]:checked')
    array.forEach((checkbox) => {
        checkbox.parentNode.parentNode.remove()
    });

    listItems.forEach((item, index) => {
        if (item.checked === true){
            listItems.splice(index, 1);
            saveToStorage(listItems);
        }
    })

}

//when the user clicks the enter key, create a new element, and move the cursor to it.
document.addEventListener('keyup', function(event){
    if (event.keyCode === 13){
        document.getElementById('plus').click();
        document.getElementById(listItems[listItems.length - 1].id).focus();
    }
} )
