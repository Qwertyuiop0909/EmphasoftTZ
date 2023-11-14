/* eslint-disable no-unsafe-optional-chaining */
import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import {
  Box,
  Container,
  Card,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TextField,
  TableCell,
} from '@material-ui/core'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { BallTriangle } from 'react-loader-spinner'
import {
  Button, Checkbox, FormControlLabel, FormGroup,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useDelete, useGet } from '../../API/request'
import { useConfirm } from '../../components/Confirm/index'
import '../../styles/All.css'
import { setUsers } from '../../redux/slices/users'

const UserList = () => {
  const confirm = useConfirm()
  const dispatch = useDispatch()
  const getU = useGet()
  const deleteU = useDelete()
  const [username, setUsername] = useState('')
  const [isSortedByDescending, setIsSortedByDescending] = useState(false)

  const [isLoaded, setIsLoaded] = useState(true)
  const [data, setData] = useState([])
  const { users } = useSelector((state) => state.users)

  const handleChangeUsername = (e) => {
    const val = e.target.value
    setUsername(val)
    if (val) { setData(users.filter((el) => el.username.includes(val))) } else { setData(users) }
  }

  const handleChangeOrder = () => {
    setData((prev) => [...prev].reverse())
    setIsSortedByDescending((prev) => !prev)
  }

  const loadUsers = () => {
    setIsLoaded(true)

    const endpoint = 'users/'

    getU(endpoint)
      .then((resp) => {
        dispatch(setUsers(resp))
        setData(resp)
      })
      .catch((err) => {
        console.log(err.response)
        setUsers([])
        setData([])
      })
      .finally(() => {
        setIsLoaded(false)
      })
  }

  const onDelete = (id) => {
    confirm({
      title: 'Удаление',
      content: 'Вы уверены, что хотите удалить пользователя?',
      onConfirm: () => {
        deleteU(`users/${id}/`)
          .then(() => {
            loadUsers()
          })
          .catch(() => {
            // console.log("opened")
            // console.log(e.response)
          })
      },
    })
  }

  useEffect(() => {
    loadUsers()
  }, [])

  if (isLoaded) {
    return (
      <div className="loader">
        <BallTriangle
          height="100"
          width="100"
          color="grey"
          ariaLabel="loading"
        />
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <Box className="headerWrapper">
        <Box className="headerTitle">
          Пользователи
        </Box>
      </Box>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }}>
        <Container maxWidth={false}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Box sx={{ marginLeft: 2 }}>
              <Link to="/app/user/add">
                <Button color="primary" variant="contained">
                  Добавить пользователя
                </Button>
              </Link>
            </Box>
            <TextField
              fullWidth
              label="User name"
              margin="normal"
              name="username"
              onChange={handleChangeUsername}
              type="text"
              value={username}
              variant="outlined"
              style={{ width: '30%', minWidth: '300px' }}
            />
            <Box sx={{
              display: 'flex', justifyContent: 'start', alignItems: 'center', paddingLeft: '10px', marginTop: '8px',
            }}
            >
              <FormGroup>
                <FormControlLabel control={<Checkbox value={isSortedByDescending} onChange={handleChangeOrder} />} label="По убыванию" />
              </FormGroup>
            </Box>
          </Box>
          <Box sx={{
            mx: 2,
            mb: 1,
          }}
          />
          <Box sx={{ pt: 3 }}>
            <Card>
              <PerfectScrollbar>
                <Box sx={{ overflow: 'auto' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ width: '10%' }}>
                          Id
                        </TableCell>
                        <TableCell sx={{ width: '20%' }}>
                          User name
                        </TableCell>
                        <TableCell sx={{ width: '20%' }}>
                          Name
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.map((user) => (
                        <TableRow hover key={user.id}>
                          <TableCell sx={{ width: 80 }}>
                            {user?.id}
                          </TableCell>
                          <TableCell>
                            {user?.username || '---'}
                          </TableCell>
                          <TableCell>
                            {(`${user?.first_name + (user?.first_name ? ' ' : '')}${user?.last_name}`) || '---'}
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', justifyContent: 'end' }}>

                              <Box sx={{ display: 'flex' }}>
                                <Link to={`/app/user/${user.id}`}>
                                  <Button
                                    color="primary"
                                    variant="contained"
                                  >
                                    Инфо.
                                  </Button>
                                </Link>
                                <Box sx={{ ml: 2 }}>
                                  <Link
                                    to={`/app/user/edit/${user.id}`}
                                  >
                                    <Button
                                      color="primary"
                                      variant="contained"
                                    >
                                      Редакт.
                                    </Button>
                                  </Link>

                                </Box>
                                <Box sx={{ ml: 2 }}>

                                  <Button
                                    color="error"
                                    variant="contained"
                                    onClick={() => onDelete(user.id)}
                                  >
                                    Удалить.
                                  </Button>

                                </Box>

                              </Box>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </PerfectScrollbar>
            </Card>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default UserList
