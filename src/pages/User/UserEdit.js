import { Helmet } from 'react-helmet'
import {
  Box,
  Container,
  Button, TextField, CardContent,
} from '@material-ui/core'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'
import {
  Alert,
  Checkbox,
} from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { usePut } from '../../API/request'

const UserEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const putU = usePut()
  const users = useSelector((state) => state.users.users)

  const getData = () => {
    const resp = users.find((el) => el.id === +id)
    return {
      username: resp.username,
      first_name: resp.first_name,
      last_name: resp.last_name,
      password: '',
      is_active: resp.is_active,
    }
  }

  const [alert, setAlert] = useState({
    txt: '',
    isVisible: false,
    type: 'error',
  })

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
    }, 1400)
  }

  const submit = async (values) => {
    putU(`users/${id}`, values)
      .then((resp) => {
        if (resp.id) {
          showAlert('success', 'User edited')
        } else {
          showAlert('error', 'Ошибка')
        }
      })
      .catch(() => {
        showAlert('error', 'Ошибка сервера')
      })
      .finally(() => {

      })
  }

  return (
    <>
      <Helmet>
        <title>Edit user</title>
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
            <Formik
              initialValues={getData()}
              validationSchema={Yup.object().shape({
                username: Yup.string().max(255).required('Username is required'),
                first_name: Yup.string(),
                last_name: Yup.string(),
                password: Yup.string()
                  .required('Password is required')
                  .min(8, 'Password\'s length must be > 8')
                  .matches(/[a-z]/g, 'Password must include lowercase words')
                  .matches(/[A-Z]/g, 'Password must include uppercase words')
                  .matches(/[0-9]/g, 'Password must include a number'),
              })}
              onSubmit={submit}
            >
              {({
                errors,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Card>
                    <CardHeader
                      title="Редактирование пользователя"
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
                        error={touched.username && errors.username}
                        helperText={touched.username && errors.username}
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
                        error={touched.password && errors.password}
                        helperText={touched.password && errors.password}
                        variant="outlined"
                      />
                      <Box sx={{ padding: '10px' }}>
                        <Checkbox
                          checked={values.is_active}
                          onChange={handleChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                          name="is_active"
                        />
                        Активный
                      </Box>
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
                        disabled={isSubmitting}
                        type="submit"
                      >
                        Сохранить
                      </Button>
                    </Box>
                  </Card>
                </form>
              )}
            </Formik>

          </Box>
        </Container>
      </Box>
    </>
  )
}
export default UserEdit
