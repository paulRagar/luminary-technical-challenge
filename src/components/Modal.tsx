import { Todo } from '../App'

type ModalProps = {
  isLoaded: boolean
  todos: Todo[]
  modalStatus: boolean
  toggleModal: () => void
}

export function Modal({isLoaded, todos, modalStatus, toggleModal}: ModalProps) {
  if (modalStatus) {
    if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div className='modal-bg' onClick={toggleModal}>
          <div className='modal' onClick={(e) => e.stopPropagation()}>
              {todos.map(todo => <p key={todo.id}>{todo.title}</p>)}
          </div>
        </div>
      )
    }
  } else {
    return (null)
  }
}