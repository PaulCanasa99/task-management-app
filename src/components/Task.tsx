import { Key, useState } from "react";
import { useMutation } from "@apollo/client";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image } from "@nextui-org/react";
import Date from './Date'
import Tag from './Tag'
import { TaskData } from "../types";
import dots from "../assets/dots.svg";
import DELETE_TASK from '../services/deleteTask.ts';
import GET_TASKS from "../services/getTasks.ts";
import CreateTaskModal from "./CreateTaskModal.tsx";

const POINT_ESTIMATES: Record<string, string> = {
  ZERO: "0",
  ONE: "1",
  TWO: "2",
  FOUR: "4",
  EIGHT: "8"
};

const Task = ({task}: {task: TaskData}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [deleteTask, {loading}] = useMutation(DELETE_TASK, {
    refetchQueries: [GET_TASKS, 'GetTasks']
  });

  const handleAction = (key: Key): void => {
    if (key === 'delete') {
      deleteTask({variables: { input: { id: task.id }}});
    }
    else {
      setOpen(true)
    }
  }

  return (
    <Card className="bg-[#2c2f33]" isDisabled={loading}>
      <CardHeader className="justify-between">
        <h1 className="font-semibold leading-none text-white">{task.name}</h1>
        <Dropdown placement="bottom-end" size="sm">
          <DropdownTrigger>
            <Button isIconOnly size="sm" color="secondary">
              <Image width={10} src={dots}/>
            </Button>
          </DropdownTrigger>
          <DropdownMenu onAction={handleAction}>
            <DropdownItem key="edit">Edit</DropdownItem>
            <DropdownItem key="delete" color="danger" className="text-danger">Delete</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardHeader>
      <CardBody className="flex gap-4">
        <div className="flex gap-1 justify-between items-center">
          <p className="text-white">{POINT_ESTIMATES[task.pointEstimate] + ' Points'}</p>
          <Date date={task.dueDate}/>
        </div>
        <div className="flex gap-4">
          {task.tags.map((tag) => <Tag key={tag} tag={tag}/>)}
        </div>  
      </CardBody>
      <CardFooter>
        <Avatar radius="full" size="md" src={task.assigneeId} />
      </CardFooter>
      <CreateTaskModal editMode open={open} onClose={() => setOpen(false)} task={task}/>
    </Card>
  )
};

export default Task;