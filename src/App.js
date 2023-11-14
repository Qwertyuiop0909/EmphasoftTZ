// import 'react-perfect-scrollbar/dist/css/styles.css'
import { useRoutes, useNavigate } from 'react-router-dom'
import { GlobalStyles, StyledEngineProvider, ThemeProvider } from '@mui/material'
import theme from './theme'
import routes from './routes'
import TokenStorage from './API/TokenStorage'

const App = () => {
  const content = useRoutes(routes)
  const navigate = useNavigate()

  if (window.location.pathname.includes('app') && TokenStorage.getAccessToken() === '') {
    navigate('/login', { replace: true })
  }

  return (
    <StyledEngineProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {content}
      </ThemeProvider>

    </StyledEngineProvider>
  )
}

export default App
