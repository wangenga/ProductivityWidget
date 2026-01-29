const list = document.getElementById('taskList');
const input = document.getElementById('taskInput');
const ding = document.getElementById('ding');

function render() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    
    // THIS IS WHERE THE BUTTON IS CREATED
    list.innerHTML = tasks.map((t, index) => `
        <li>
            <span onclick="toggle(${index})" style="flex-grow:1; cursor:pointer; ${t.done ? 'text-decoration:line-through; color:gray' : ''}">
                ${t.text}
            </span>
            <button onclick="removeTask(${index})" style="background:none; border:none; color:red; cursor:pointer; font-weight:bold;">×</button>
        </li>
    `).join('');
}

function addTask() {
    if (!input.value.trim()) return;
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push({ text: input.value, done: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    input.value = '';
    render();
}

// The Delete Function
window.removeTask = (index) => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    render();
};

window.toggle = (index) => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks[index].done = !tasks[index].done;
    if(tasks[index].done) { ding.currentTime = 0; ding.play(); }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    render();
};

// Listen for Enter key
input.addEventListener('keypress', (e) => { if(e.key === 'Enter') addTask() });

// Start up
render();