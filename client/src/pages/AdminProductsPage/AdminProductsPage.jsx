import './adminProductsPage.scss'
import { Route, useRouteMatch } from 'react-router-dom'
import ProductList from 'components/specific/admin/ProductList/ProductList'
import EditProduct from 'components/specific/admin/EditProduct/EditProduct'


const AdminProductsPage = () => {
  document.title = `Products Admin | ofwood`;

    const {path}=useRouteMatch()

  return (
    <>
        <Route path={`${path}`} exact component={ProductList} />
        <Route path={`${path}/:slug`} component={EditProduct} />
    </>

  )
}

export default AdminProductsPage