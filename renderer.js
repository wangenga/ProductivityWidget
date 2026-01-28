function render() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    document.getElementById('taskList').innerHTML = tasks.map((t, i) =>
        `<li onclick="toggle(${i})" style="${t.done ? 'text-decoration:line-through' : ''}">${t.text}</li>`
    ).join('');
}
function addTask() {
    const input = document.getElementById('taskInput');
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push({ text: input.value, done: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    input.value = ''; render();
}

function removeTask() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(index, 1); // Remove 1 item at this index
    localStorage.setItem('tasks', JSON.stringify(tasks));
    render();
}
window.toggle = (i) => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks[i].done = !tasks[i].done;
    if(tasks[i].done) document.getElementById('ding').play();
    localStorage.setItem('tasks', JSON.stringify(tasks));
    render();
}
render();