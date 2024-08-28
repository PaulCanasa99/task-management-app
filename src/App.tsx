import { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { Chip, Spinner } from '@nextui-org/react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import TaskColumn from './components/TaskColumn'
import CreateTaskModal from './components/CreateTaskModal'
import GET_TASKS from './services/getTasks'
import ErrorHandler from './components/ErrorHandler'
import './App.css'

const filterTasksByStatus = (tasks: any[], status: string) => {
  return tasks.filter(({status: taskStatus}) => taskStatus === status);
}

const App = () => {
  const [getTasks, {data, error, loading}] = useLazyQuery(GET_TASKS, {variables: {input: {ownerId: '6b836ab3-a687-43f2-8c66-60dcaa528683'}}});

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className='grid grid-cols-12 gap-4'>
      <div className='col-span-2'>
        <Sidebar />
      </div>
      <div className='col-span-10'>
        <Navbar getTasks={getTasks}/>
        <div className='flex flex-row-reverse'>
          <CreateTaskModal/>
        </div>
        {loading ? <Spinner size='lg'/> :
          data?.tasks?.length ?
            <div className='grid grid-cols-3 gap-4'>
              <TaskColumn title='To Do' tasks={filterTasksByStatus(data.tasks, 'TODO')}/>
              <TaskColumn title='In Progress' tasks={filterTasksByStatus(data.tasks, 'IN_PROGRESS')}/>
              <TaskColumn title='Done' tasks={filterTasksByStatus(data.tasks, 'DONE')}/>
            </div> :
              error ? <ErrorHandler error={error}/> : <Chip size='lg'>No tasks found</Chip>
          }
      </div>
    </div>
  )
}

export default App
