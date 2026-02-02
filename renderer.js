const activeList = document.getElementById('taskList')
const completedList = document.getElementById('completedList');
const completedSection = document.getElementById('completed-section');
const input = document.getElementById('taskInput');
const ding = document.getElementById('ding');

function render() {

    let tasks;
    try{
        tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        if (!Array.isArray(tasks)) throw new Error();
    } catch (e) {
        tasks = [];
        localStorage.setItem('tasks', '[]');
    }

    let activeHTML = '';
    let completedHTML = '';
    let hasCompletedTasks = false;
    
    tasks.forEach((t, index) => {
        
        const taskHTML= `
        <li style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; width: 100%;">
            
            <span onclick="toggle(${index})" 
                  style="flex: 1; 
                         min-width: 0; 
                         white-space: nowrap; 
                         overflow: hidden; 
                         text-overflow: ellipsis; 
                         cursor: pointer; 
                         padding-right: 10px;
                         ${t.done ? 'text-decoration:line-through; color:gray' : ''}">
                ${t.text}
            </span>

            <div style="display: flex; gap: 2px; flex-shrink: 0;">
                
                <button onclick="editTask(${index})" 
                        class="icon-btn edit-btn" 
                        title="Edit">
                    ✎
                </button>

                <button onclick="removeTask(${index})" 
                        class="icon-btn delete-btn" 
                        title="Delete">
                    ×
                </button>
            </div>

        </li>`;

        if (t.done) {
            completedHTML += taskHTML;
            hasCompletedTasks = true;
        } else {
            activeHTML += taskHTML;
        }
    });

    if (activeList) activeList.innerHTML = activeHTML;
    if (completedList) completedList.innerHTML = completedHTML;
    if (completedSection) completedSection.style.display = hasCompletedTasks ? 'block' : 'none';
}

function addTask() {
    if (!input.value.trim()) return;
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push({ text: input.value, done: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    input.value = '';
    render();
}

// 1. DELETE Function
window.removeTask = (index) => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    render();
};

// 2. EDIT Function
window.editTask = (index) => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    
    // Move text back to input box
    input.value = tasks[index].text;
    input.focus();
    
    // Delete the old one (so we don't end up with duplicates)
    removeTask(index);
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