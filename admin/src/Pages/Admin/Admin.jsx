import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import Sidebar from '../../Components/Sidebar/Sidebar'
import  './Admin.css'
import { Router ,Routes,Route } from 'react-router-dom'
const Admin = () => {
  return (
    <div className='Admin' >
      <Sidebar />
      <Routes>
        <Route path='/addproduct' element={<AddProduct/>} />
         <Route path='/listproduct' element={<ListProduct />} />
      </Routes>
    </div>
  )
}

export default Admin
