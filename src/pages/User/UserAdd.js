import { Helmet } from 'react-helmet'
import {
  Box,
  Container,
  Button, TextField, CardContent,
} from '@material-ui/core'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import { useNavigate } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'
import {
  Alert,
  Checkbox, FormControlLabel, FormGroup,
} from '@mui/material'
import { useState } from 'react'
import { usePost } from '../../API/request'

const UserAdd = () => {
  const navigate = useNavigate()
  const postU = usePost()

  const [values, setValues] = useState({
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    is_active: false,
  })
  const [submitDisabled, setSubmitDisabled] = useState(false)

  const [alert, setAlert] = useState({
    txt: '',
    isVisible: false,
    type: 'error',
  })

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  const handleChangeIsActive = () => {
    setValues({
      ...values,
      is_active: !values.is_active,
    })
  }

  const showAlert = (type, text) => {
    setAlert({
      txt: text,
      type,
      isVisible: true,
    })

    setTimeout(() => {
      setAlert({
        txt: text,
        type,
        isVisible: false,
      })

      setSubmitDisabled(false)
    }, 1400)
  }

  const validate = () => {
    let validComplete = true

    if (values.username === '') {
      validComplete = false
      showAlert('error', 'Поле Ник не должно быть пустым')
    }

    if (values.first_name === '') {
      validComplete = false
      showAlert('error', 'Поле Имя не должно быть пустым')
    }

    if (values.last_name === '') {
      validComplete = false
      showAlert('error', 'Поле Фамилия не должно быть пустым')
    }

    if (values.password === '') {
      validComplete = false
      showAlert('error', 'Поле Пароль не должно быть пустым')
    } else if (values.password.length < 8) {
      validComplete = false
      showAlert('error', 'Пароль должен содержать более 8 символов')
    } else if (!values.password.match(/[A-Z]/g)) {
      validComplete = false
      showAlert('error', 'Пароль должен содержать символ в верхнем регистре')
    } else if (!values.password.match(/[a-z]/g)) {
      validComplete = false
      showAlert('error', 'Пароль должен содержать символ в нижнем регистре')
    } else if (!values.password.match(/[0-9]/g)) {
      validComplete = false
      showAlert('error', 'Пароль должен содержать цифру')
    }

    return validComplete
  }

  const clearForm = () => {
    setValues({
      username: '',
      first_name: '',
      last_name: '',
      password: '',
      is_active: false,
    })
  }

  const submit = async () => {
    if (validate()) {
      setSubmitDisabled(true)

      postU('users/', values)
        .then((resp) => {
          if (resp) {
            showAlert('success', 'User added')
            clearForm()
          } else {
            showAlert('error', 'Ошибка')
          }
        })
        .catch(() => {
          showAlert('error', 'Ошибка сервера')
          setSubmitDisabled(false)
        })
        .finally(() => {

        })
    }
  }

  return (
    <>
      <Helmet>
        <title>Create new user</title>
      </Helmet>
      <Box sx={{ pt: 2 }}>
        <Container maxWidth={false}>
          <Button startIcon={<ChevronLeft />} onClick={() => navigate(-1)}>
            Back
          </Button>
        </Container>
      </Box>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100%' }}>
        <Container maxWidth={false}>
          <Box sx={{ pt: 2 }}>
            <form>
              <Card>
                <CardHeader
                  title="Добавление нового пользователя"
                />
                <Divider />
                <CardContent sx={{ position: 'relative' }}>
                  <TextField
                    fullWidth
                    label="Ник"
                    margin="normal"
                    name="username"
                    onChange={handleChange}
                    type="text"
                    value={values.username}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Имя"
                    margin="normal"
                    name="first_name"
                    onChange={handleChange}
                    type="text"
                    value={values.first_name}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Фамилия"
                    margin="normal"
                    name="last_name"
                    onChange={handleChange}
                    type="text"
                    value={values.last_name}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    margin="normal"
                    name="password"
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                  <FormGroup>
                    <FormControlLabel control={<Checkbox value={values.is_active} onChange={handleChangeIsActive} />} label="Активный" />
                  </FormGroup>
                  <Alert
                    severity={alert.type}
                    style={{ display: alert.isVisible ? 'flex' : 'none' }}
                  >
                    {alert.txt}
                  </Alert>
                </CardContent>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={submit}
                    disabled={submitDisabled}
                  >
                    Добавить
                  </Button>
                </Box>
              </Card>
            </form>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default UserAdd
