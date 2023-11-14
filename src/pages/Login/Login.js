/* eslint-disable no-shadow */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import * as Yup from 'yup'
import { Formik } from 'formik'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@material-ui/core'
import { BallTriangle } from 'react-loader-spinner'
import { useDispatch } from 'react-redux'
import TokenStorage from '../../API/TokenStorage'
import { fetchLogin } from '../../redux/slices/auth'
import '../../styles/Login/style.css'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [authError, setAuthError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const showErrAlert = () => {
    setAuthError(true)

    setTimeout(() => {
      setAuthError(false)
    }, 1500)
  }

  const sendEmail = async (values) => {
    setIsLoaded(true)

    const data = {
      username: values.login,
      password: values.password,
    }

    fetchLogin(dispatch, {
      data,
      onSuccess: async (data) => {
        console.log(data)
        await TokenStorage.setAccessToken(data)

        await setIsLoaded(false)
        await navigate('/app/users')
      },
      onFailed: (e) => {
        console.log(e)
        setIsLoaded(false)
        showErrAlert()
      },
    })
  }

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
        <title>Login</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              login: '',
              password: '',
            }}
            validationSchema={Yup.object().shape({
              login: Yup.string().max(255).required('Login is required'),
              password: Yup.string().max(255).required('Password is required'),
            })}
            onSubmit={sendEmail}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.login && errors.login)}
                  fullWidth
                  helperText={touched.login && errors.login}
                  label="Login"
                  margin="normal"
                  name="login"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.login}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting || authError}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                {authError ? <Typography style={{ color: 'red' }}>User not found</Typography> : ''}
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  )
}

export default Login
