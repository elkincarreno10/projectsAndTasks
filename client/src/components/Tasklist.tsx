import TaskCard from "./TaskCard"

interface Task {
    _id: string;
    title: string;
}

interface TasksProp {
    tasks: Task[];
}

const Tasklist = ({ tasks }: TasksProp) => {
  return (
    <div>
      {tasks.map(task => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  )
}

export default Tasklist
