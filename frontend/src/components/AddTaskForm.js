import { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import formatDate from '../util/formatDate';

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

const AddTaskForm = () => {
  const [textState, setTextState] = useState('');
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(formatDate(date));
  const [reminderState, setReminderState] = useState(false);

  let text, reminder;

  const [addTask] = useMutation(ADD_TASK);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!textState) {
      alert('Please name a task!');
      return;
    }

    addTask({
      variables: {
        text: text.value,
        day: formattedDate,
        reminder: reminderState,
      },
    });

    setReminderState(false);
    text.value = '';
  };

  const dateSelected = (date) => {
    const formattedDate = formatDate(date);
    console.log(formattedDate);
    setFormattedDate(formattedDate);
    setDate(date);
  };

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
        <label>Date</label>
        <DatePicker
          selected={date}
          onChange={dateSelected}
          dateFormat='Y-MM-dd'
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
