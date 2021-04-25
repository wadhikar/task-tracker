import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import Task from './Task';

const QUERY_TASKS = gql`
  query {
    tasks {
      id
      text
      day
      reminder
    }
  }
`;

const Tasks = ({ onToggle }) => {
  const { data, loading } = useQuery(QUERY_TASKS, {
    pollInterval: 1000,
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {data && (
        <>
          {data.tasks.map((task) => (
            <Task key={task.id} task={task} onToggle={onToggle} />
          ))}
        </>
      )}
    </div>
  );
};

export default Tasks;
