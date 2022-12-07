import { useEffect, useState } from 'react'
import { UserRow } from './UserRow'

type UsersTableProps = {
  onUserSelect: (id: number) => void
}

export type User = {
  id: number
  name: string
  website: string
  email: string
  address: {
    street:	string
    city:	string
    zipcode:	string
  }
}

export function UsersTable(props: UsersTableProps) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setUsers(result)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])
  
  if (error) {
    return <div>Uh oh... Something went wrong!</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Website</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <UserRow
              key={user.email}
              user={user}
              onUserSelect={props.onUserSelect}
            />
          ))}
        </tbody>
      </table>
    )
  }
}