import { Counter } from "./components/Counter";
import { Home } from "./components/Home";
import TaskCreate from "./components/Task/TaskCreate";
import TaskId from "./components/Task/TaskId";
import  TaskIndex  from "./components/Task/TaskIndex";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/tasks',
    element: <TaskIndex />
  },
  {
    path: '/tasks/create',
    element: <TaskCreate />
  },
  {
    path: '/tasks/:id',
    element: <TaskId />
  },

];

export default AppRoutes;
