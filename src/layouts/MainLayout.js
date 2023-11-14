import { Outlet } from 'react-router-dom'
import { styled } from '@material-ui/core/styles'
import { Confirm } from '../components/Confirm'
import { AlertProvider } from '../components/Alert'
import { GlobalLoader } from '../components/GlobalLoader'
import DashboardNavbar from '../components/Nav/DashboardNavbar'

const MainLayoutRoot = styled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  }),
)

const MainLayoutWrapper = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64,
})

const MainLayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
})

const MainLayoutContent = styled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto',
})

const MainLayout = () => (
  <MainLayoutRoot>
    <DashboardNavbar />
    <MainLayoutWrapper>
      <MainLayoutContainer>
        <MainLayoutContent>
          <Confirm>
            <AlertProvider>
              <GlobalLoader>
                <Outlet />
              </GlobalLoader>
            </AlertProvider>
          </Confirm>

        </MainLayoutContent>
      </MainLayoutContainer>
    </MainLayoutWrapper>
  </MainLayoutRoot>
)

export default MainLayout
