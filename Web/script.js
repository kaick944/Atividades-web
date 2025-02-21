const addButton = document.getElementById('add');
const clearButton = document.getElementById('clear');
const saveButton = document.getElementById('save'); 
const list = document.getElementById('list');
const counter = document.getElementById('counter');

function updateCounter() {
    counter.textContent = list.children.length;
}

function createRemoveButton(item) {
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove');
    removeButton.style.color = 'red';
    removeButton.addEventListener('click', function() {
        item.remove();
        updateCounter();
    });
    return removeButton;
}

addButton.addEventListener('click', function() {
    const input = document.getElementById('inputItem');
    const newItem = document.createElement('li');
    newItem.textContent = input.value + ' ';
    newItem.classList.add('fade-in');
    newItem.appendChild(createRemoveButton(newItem));
    list.appendChild(newItem);
    input.value = '';
    updateCounter();
});

clearButton.addEventListener('click', function() {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    updateCounter();
});

saveButton.addEventListener('click', function() {
    let items = [];
    for (let i = 0; i < list.children.length; i++) {
        let itemText = list.children[i].textContent.replace('Remove', '').trim();
        items.push(itemText);
    }
    const blob = new Blob([items.join('\n')], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'list.txt';
    link.click();
});