import Task from "./Task";
import { TaskData } from "../types";

interface TaskColumnProps {
  title: string;
  tasks: TaskData[];
}

const TaskColumn = ({title, tasks}: TaskColumnProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-left font-semibold">{title} ({tasks.length})</h4>
      {tasks.map((task) => <Task task={task} key={task.name}/>)}
    </div>
  )
};

export default TaskColumn;