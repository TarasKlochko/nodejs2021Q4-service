import { FastifyRequest } from 'fastify';

type TaskID = string;
interface Task {
  id: TaskID;
  title: string;
  order: number;
  description: string;
  userId: null | string;
  boardId: null | string;
  columnId: null | string;
}

let tasks: Task[] = [
  {
    id: '58b3b81a-32cb-409c-b21f-31b27c32d141',
    title: 'Tasks 1',
    order: 1,
    description: 'Taskkkk oneee',
    userId: null,
    boardId: null,
    columnId: null,
  },
  {
    id: '58b3b81a-32cb-409c-b21f-31b27c32d142',
    title: 'Tasks 2',
    order: 2,
    description: 'Taskkkk twooo',
    userId: null,
    boardId: null,
    columnId: null,
  },
  {
    id: '58b3b81a-32cb-409c-b21f-31b27c32d143',
    title: 'Tasks 3',
    order: 3,
    description: 'Taskkkk threee',
    userId: '13249960-a603-4a82-93aa-94d593427387',
    boardId: null,
    columnId: null,
  },
];

function getAll() {
  return tasks;
}

function getByID(id: TaskID) {
  const task = tasks.find((taskItem) => taskItem.id === id);
  return task;
}

async function add(task: Task) {
  tasks = [...tasks, task];
}

async function update(req: FastifyRequest) {
  const { id } = <{ id: TaskID }>req.params;
  const { title, order, description, userId, columnId } = <Task>req.body;
  tasks = tasks.map((task) =>
    task.id === id
      ? { ...task, title, order, description, userId, columnId }
      : task
  );
}

async function deleteByID(id: TaskID, all = false) {
  if (!all) {
    tasks = tasks.filter((task) => task.id !== id);
  } else {
    tasks = tasks.filter((task) => task.boardId !== id);
  }
}

function cleanUserValue(id: TaskID) {
  const userId = null;
  tasks = tasks.map((task) =>
    task.userId === id ? { ...task, userId } : task
  );
}
export default { getAll, getByID, add, update, deleteByID, cleanUserValue };
