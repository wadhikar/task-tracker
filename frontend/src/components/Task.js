import { FaTimes } from 'react-icons/fa';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const DELETE_TASK = gql`
  mutation deleteMutation($id: ID!) {
    deleteTask(id: $id) {
      task {
        id
      }
    }
  }
`;

const UPDATE_TASK = gql`
  mutation updateReminderMutation($id: ID!) {
    updateTask(id: $id) {
      task {
        id
        reminder
      }
    }
  }
`;

const Task = ({ task }) => {
  const [deleteTask] = useMutation(DELETE_TASK);
  const [updateReminderToggle] = useMutation(UPDATE_TASK);

  const onDeleteTask = (id) => {
    deleteTask({
      variables: {
        id: id,
      },
    });
  };

  const toggleReminder = (id) => {
    updateReminderToggle({
      variables: {
        id: id,
      },
    });
  };

  return (
    <div
      className={`task ${task.reminder ? 'reminder' : ''}`}
      onDoubleClick={() => toggleReminder(task.id)}
    >
      <h3>
        {task.text}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDeleteTask(task.id)}
        />
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

export default Task;
