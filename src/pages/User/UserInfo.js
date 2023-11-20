import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import {
  Box,
  Container,
  Button,
  Card,
  CardContent,
} from '@material-ui/core'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import { useParams, useNavigate } from 'react-router-dom'
import '../../styles/All.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useSelector } from 'react-redux'

const UserInfo = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [user, setUser] = useState({})
  const users = useSelector((state) => state.users.users)

  useEffect(() => {
    setUser(users.find((el) => el.id === +id))
  }, [])

  return (
    <>
      <Helmet>
        <title>User</title>
      </Helmet>
      <Box className="headerWrapper">
        <Box className="headerTitle">
          <Button startIcon={<ChevronLeft />} onClick={() => navigate(-1)}>
            Назад
          </Button>
          Пользователи
        </Box>
      </Box>

      <Box sx={{ backgroundColor: 'background.default', pt: 3, pb: 1 }}>
        <Container maxWidth={false}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <PerfectScrollbar>
                <div className="wrapAvatar">
                  <div className="info-block">
                    <div className="wrap">
                      <div className="label">
                        ID:
                      </div>
                      <div className="text">
                        {user?.id || '---'}
                      </div>
                    </div>
                    <div className="wrap">
                      <div className="label">
                        User name
                      </div>
                      <div className="text">
                        {user?.username || '---'}
                      </div>
                    </div>

                    <div className="wrap">
                      <div className="label">
                        First name
                      </div>
                      <div className="text">
                        {user?.first_name || '---'}
                      </div>
                    </div>

                    <div className="wrap">
                      <div className="label">
                        Last name
                      </div>
                      <div className="text">
                        {user?.last_name || '---'}
                      </div>
                    </div>

                    <div className="wrap">
                      <div className="label">
                        Активный:
                      </div>
                      <div className="text">
                        {user?.is_active ? 'true' : 'false'}
                      </div>
                    </div>
                  </div>

                </div>
              </PerfectScrollbar>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  )
}

export default UserInfo
