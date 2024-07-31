import { TaskListContext } from './contexts/task-list';
import Router from './router';

const TodoApp = () => (
  <TaskListContext>
    <Router />
  </TaskListContext>
);
export default TodoApp;
