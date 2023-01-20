import Box from 'components/common/Box/Box'
import './adminUser.scss'
import { Route, useRouteMatch } from 'react-router-dom'
import UserList from 'components/specific/admin/UserList/UserList'


const AdminUser = () => {
    const {path}=useRouteMatch()

  return (
    <Box classes={"bg-secondary-ofwood"}>
    <Route path={`${path}`} exact component={UserList} />
</Box>
  )
}

export default AdminUser