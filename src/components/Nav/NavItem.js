import { useState } from 'react'
import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
} from 'react-router-dom'
import PropTypes from 'prop-types'
import { List } from '@material-ui/core'
import { Button, ListItem } from '@mui/material'

const NavItem = ({
  href,
  icon: Icon,
  title,
  list,
  ...rest
}) => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  if (list) {
    return (
      <ListItem
        disableGutters
        sx={{
          display: 'flex',
          py: 0,
          flexDirection: 'column',
        }}
        {...rest}
      >
        <Button
          sx={{
            color: 'text.secondary',
            fontWeight: 'medium',
            justifyContent: 'flex-start',
            letterSpacing: 0,
            py: 1.25,
            textTransform: 'none',
            width: '100%',
          }}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {Icon && (
          <Icon size="20" />
          )}
          <span style={{ 'margin-left': 2 }}>
            {title}
          </span>
        </Button>
        {isOpen && (
        <List
          sx={{
            width: '100%',
            backgroundColor: '#5664d21a',
            borderRadius: 1,
            pl: 2,
          }}
        >
          {list.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
            />
          ))}
        </List>
        )}
      </ListItem>
    )
  }

  const active = href ? !!matchPath({
    path: href,
    end: false,
  }, location.pathname) : false

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        py: 0,
      }}
      {...rest}
    >
      <Button
        component={RouterLink}
        sx={{
          color: 'text.secondary',
          fontWeight: 'medium',
          gap: 1,
          letterSpacing: 0,
          py: 1.25,
          textTransform: 'none',
          width: '100%',
          fontSize: '18px',
          ...(active && {
            color: 'primary.main',
          }),
        }}
        to={href}
      >
        {Icon && (
        <Icon size="20" />
        )}
        <span>
          {`${title}`}
        </span>
      </Button>
    </ListItem>
  )
}

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string,
  list: PropTypes.array,
}

export default NavItem
