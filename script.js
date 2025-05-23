const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const addButton = document.getElementById('add-button');
const lists = document.querySelectorAll('ul li');

function addTask(e) {
    if (inputBox.value === '') {
        alert('Please enter a task');
    } 
    else if (addButton.innerHTML = 'Add' ){
        console.log(addButton.innerHTML)
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement('span');
        let editImg = document.createElement('img');
        editImg.src = './images/Edit.png';

        editImg.alt = 'edit';
        span.appendChild(editImg);


        let crossImg = document.createElement('img');
        crossImg.src = './images/remove.png';
        crossImg.alt = 'remove';
        span.appendChild(crossImg);

        li.appendChild(span);
    }
    
    inputBox.value = '';
    saveData();


}

lists.forEach(li => {
    if (li.textContent.length > 40) {
        li.classList.add('long-text');
    }
});

function updateTodo(e){
    let li = e.target.parentNode.parentNode;
    addButton.innerText = 'Edit';
    inputBox.value = li.innerText;
    inputBox.focus();
    li.remove();
    console.log(inputBox.value)

}

listContainer.addEventListener('click', function(e) {
    let text = e.target.alt;
    console.log(e.target)
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData();
    } else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
        saveData();
    } else if (e.target.tagName === 'IMG') {
        if (e.target.alt === 'remove') {
        e.target.parentElement.parentElement.remove();
        } else if (e.target.alt === 'edit') {
            updateTodo(e);
        }
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data",listContainer.innerHTML)
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

addButton.addEventListener('click', addTask);


inputBox.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !addButton.disabled) {
          addTask();
          e.preventDefault();
        }
      });
    
showTask();