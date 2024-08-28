import { useState } from "react";
import { useMutation, useQuery } from '@apollo/client';
import { format } from "date-fns";
import {parseDate } from "@internationalized/date";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Image, Input, Select, SelectItem, DatePicker, Avatar } from "@nextui-org/react";
import add from "../assets/add.svg";
import CREATE_TASK from '../services/createTask.ts';
import UPDATE_TASK from '../services/updateTask.ts';
import GET_USERS from "../services/getUsers.ts";
import GET_TASKS from "../services/getTasks.ts";
import { TaskData, UserData } from "../types";

const estimationOptions = [
  {key: "ZERO", label: "0 Points"},
  {key: "ONE", label: "1 Point"},
  {key: "TWO", label: "2 Point"},
  {key: "FOUR", label: "4 Point"},
  {key: "EIGHT", label: "8 Point"},
]

const tagOptions = [
  {key: "ANDROID", label: "ANDROID"},
  {key: "IOS", label: "IOS"},
  {key: "NODE_JS", label: "NODE_JS"},
  {key: "RAILS", label: "RAILS"},
  {key: "REACT", label: "REACT"},
]

const statusOptions = [
  {key: "TODO", label: "To do"},
  {key: "IN_PROGRESS", label: "In progress"},
  {key: "DONE", label: "Done"},
]

const convertToUtc = (inputDate: any) => {
  const date = new Date(inputDate.year, inputDate.month - 1, inputDate.day);
  const utcDate = format(date, 'yyyy-MM-dd HH:mm:ssXXX');

  return utcDate;
}

const CreateTaskModal = ({task, editMode, open, onClose}: {task?: TaskData ,editMode?: boolean, open?: boolean, onClose?: () => void}) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure({isOpen: open, onClose: onClose});
  const [createTask] = useMutation(CREATE_TASK, {refetchQueries: [GET_TASKS, 'GetTasks']});
  const [updateTask] = useMutation(UPDATE_TASK, {refetchQueries: [GET_TASKS, 'GetTasks']});
  const {data} = useQuery(GET_USERS);
  const [name, setName] = useState<string>(task?.name ?? '');
  const [pointEstimate, setPointEstimate] = useState<string>(task?.pointEstimate ?? '');
  const [assigneeId, setAssigneeId] = useState<string>(task?.assignee.id ?? '');
  const [tags, setTags] = useState<any>(task?.tags ?? '');
  const [dueDate, setDueDate] = useState(task?.dueDate ? parseDate(task.dueDate.slice(0,10)) : parseDate((new Date).toISOString().slice(0,10)));
  const [status, setStatus] = useState<string>(task?.status ?? '');

  const saveTask = (onClose: () => void) => {
    const task = {
      name,
      pointEstimate: pointEstimate,
      assigneeId: assigneeId,
      tags: tags.filter((tag: any) => tag),
      dueDate: convertToUtc(dueDate),
      status: status
    }
    createTask({variables: { input: task }});
    onClose();
  }

const editTask = (onClose: () => void) => {
    const updatedTask = {
      id: task?.id,
      name,
      pointEstimate,
      assigneeId,
      tags: tags.filter((tag: any) => tag),
      dueDate: convertToUtc(dueDate),
      status: status
    }
    updateTask({variables: { input: updatedTask }});
    onClose();
  }

  return (
    <>
      {!editMode && <Button isIconOnly color='primary' className='my-4' onPress={onOpen}><Image width={20} src={add}/></Button>}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create task</ModalHeader>
              <ModalBody>
                <Input autoFocus type="title" label="Title" value={name} onValueChange={setName}/>
                <Select
                  label="Estimate"
                  items={estimationOptions}
                  selectedKeys={[pointEstimate]}
                  onChange={({target}) => setPointEstimate(target.value)}
                >
                  {(estimation) => <SelectItem key={estimation.key}>{estimation.label}</SelectItem>}
                </Select>
                <Select
                  label="Assign to"
                  items={data.users}
                  selectedKeys={[assigneeId]}
                  onChange={({target}) => setAssigneeId(target.value)}
                >
                  {(user : UserData)  => <SelectItem startContent={<Avatar src={user.avatar}/>} key={user.id}>{user.fullName}</SelectItem>}
                </Select>
                <Select
                  label="Tag Title"
                  items={tagOptions}
                  selectionMode="multiple"
                  selectedKeys={tags}
                  onChange={({target}) => setTags(target.value.split(','))}
                >
                  {(tag) => <SelectItem key={tag.key}>{tag.label}</SelectItem>}
                </Select>
                <DatePicker label="Due date" value={dueDate} onChange={setDueDate}/>
                <Select
                  label="Status"
                  items={statusOptions}
                  selectedKeys={[status]}
                  onChange={({target}) => setStatus(target.value)}
                >
                  {(status) => <SelectItem key={status.key}>{status.label}</SelectItem>}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={editMode ? () => editTask(onClose) : () => saveTask(onClose)}>
                  {editMode ? 'Edit' : 'Create'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateTaskModal;