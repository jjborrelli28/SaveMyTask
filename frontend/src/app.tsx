import TasksContext from './contexts/tasks';
import Router from './router';

const TodoApp = () => (
  <TasksContext>
    <Router />
  </TasksContext>
);
export default TodoApp;
