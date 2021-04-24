import { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const ADD_TASK = gql`
  mutation createTask($text: String!, $day: Date, $reminder: Boolean) {
    createTask(text: $text, day: $day, reminder: $reminder) {
      id
      text
      day
      reminder
    }
  }
`;

const AddTaskForm = ({ onAdd }) => {
  const [textState, setTextState] = useState('');
  const [dateState, setDateState] = useState('');
  const [reminderState, setReminderState] = useState(false);

  let text, day, reminder;

  const [addTask] = useMutation(ADD_TASK);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!textState) {
      alert('Please name a task!');
      return;
    }

    // TODO: Ensure date input is valid
    // Currently only checks if it has any value at all
    if (!dateState) {
      alert('Please choose a date!');
      return;
    }

    addTask({
      variables: {
        text: text.value,
        day: day.value,
        reminder: reminderState,
      },
    });

    setReminderState(false);
    text.value = '';
    day.value = '';
  };

  // TODO: Use DatePicker package for better date input

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Task</label>
        <input
          ref={(node) => {
            text = node;
          }}
          onChange={(e) => setTextState(e.target.value)}
          placeholder='Add Task'
        />
      </div>
      <div className='form-control'>
        <label>Date (YYYY-MM-DD)</label>
        <input
          ref={(node) => {
            day = node;
          }}
          placeholder='Choose Date'
          onChange={(e) => setDateState(e.target.value)}
        />
      </div>
      <div className='form-control form-control-check'>
        <label>Set Reminder</label>
        <input
          type='checkbox'
          checked={reminder}
          value={reminder}
          onChange={(e) => {
            setReminderState(e.currentTarget.checked);
            reminder = reminderState;
          }}
        />
      </div>

      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  );
};

export default AddTaskForm;
