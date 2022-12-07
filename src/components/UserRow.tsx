import { User } from './UsersTable';

type UserRowProps = {
  user: User
  onUserSelect: (id: number) => void
}

export function UserRow({user, onUserSelect}: UserRowProps) {
  return (
    <tr className='user-row' onClick={() => onUserSelect(user.id)}>
      <td>{ user.name }</td>
      <td>{ user.website }</td>
      <td>{ user.email }</td>
      <td>{ `${user.address.street}, ${user.address.city} ${user.address.zipcode}` }</td>
    </tr>
  )
}