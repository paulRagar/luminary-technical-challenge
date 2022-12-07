import { useEffect, useState } from 'react';
import { Modal } from './components/Modal'
import { UsersTable } from './components/UsersTable';
import './style/scss/style.scss'

export type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [todos, setTodos] = useState<Todo[]>([])

  function onUserSelect(id: number) {
    setSelectedUserId(id)
    setModalStatus(!modalStatus)
    toggleModal()
  }

  function toggleModal() {
    setModalStatus(!modalStatus)
  }

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setTodos(result)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])

  if (error) {
    return <div>Uh oh... Something went wrong!</div>
  } else {
    return (
      <div className='app'>
        <UsersTable onUserSelect={onUserSelect} />
        <Modal
          isLoaded={isLoaded}
          todos={todos.filter(todo => todo.userId === selectedUserId)}
          modalStatus={modalStatus}
          toggleModal={toggleModal}
        />
      </div>
    )
  }
}

export default App
