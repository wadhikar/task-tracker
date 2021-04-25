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

const Task = ({ task, onToggle }) => {
  const [deleteTask] = useMutation(DELETE_TASK);

  const onDeleteTask = (id) => {
    deleteTask({
      variables: {
        id: id,
      },
    });
  };

  return (
    <div
      className={`task ${task.reminder ? 'reminder' : ''}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}
        {/* <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(task.id)}
        /> */}
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
