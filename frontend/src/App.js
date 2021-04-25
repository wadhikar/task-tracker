import { useState } from 'react';

import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTaskForm from './components/AddTaskForm';

function App() {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

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
      {showAddTaskForm && <AddTaskForm />}
      <Tasks />
    </div>
  );
}

export default App;
