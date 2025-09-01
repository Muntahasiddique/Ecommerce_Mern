import AddProduct from '../../Components/AddProduct/AddProduct'
import EditProduct from '../../Components/EditProduct/EditProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Navigate } from 'react-router-dom'
import  './Admin.css'
import { Router ,Routes,Route } from 'react-router-dom'
const Admin = () => {
  return (
    <div className='Admin' >
      <Sidebar />
      <Routes>
          <Route path="/" element={<Navigate to="/addproduct" replace />} />
        <Route path='/addproduct' element={<AddProduct/>} />
         <Route path='/listproduct' element={<ListProduct />} />
     
        <Route path='/editproduct/:productId' element={<EditProduct />} />

      </Routes>
    </div>
  )
}

export default Admin
