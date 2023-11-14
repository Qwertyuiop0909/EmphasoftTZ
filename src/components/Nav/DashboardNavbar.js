/* eslint-disable react/require-default-props */
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
} from '@material-ui/core'
import InputIcon from '@material-ui/icons/Input'
import TokenStorage from '../../API/TokenStorage'
import Logo from '../Logo/Logo'

const DashboardNavbar = ({ ...rest }) => {
  const navigate = useNavigate()

  const onLogOut = () => {
    TokenStorage.logOut()
    navigate('/login', { replace: true })
  }

  return (
    <AppBar
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit" size="large" onClick={onLogOut}>
          <InputIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func,
}

export default DashboardNavbar
