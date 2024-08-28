export interface TaskData {
  tags: string[],
  status: string,
  pointEstimate: string,
  ownerId: string,
  name: string,
  dueDate: string,
  assigneeId: string,
  assignee: any,
  id: string
}

export interface UserData {
  avatar: string,
  id: string,
  fullName: string
}