import { useState } from 'react';

import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTaskForm from './components/AddTaskForm';

function App() {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [tasks, setTasks] = useState([]);

  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };

  // TODO: Reflect Delete in GraphQL
  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // TODO: Reflect Reminder Toggle in GraphQL
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  const toggleShowAddForm = () => {
    setShowAddTaskForm(!showAddTaskForm);
  };

  return (
    <div className='container'>
      <Header
        title='Task Tracker'
        onAdd={toggleShowAddForm}
        showAdd={showAddTaskForm}
      />
      {showAddTaskForm && <AddTaskForm onAdd={addTask} />}
      <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
    </div>
  );
}

export default App;
