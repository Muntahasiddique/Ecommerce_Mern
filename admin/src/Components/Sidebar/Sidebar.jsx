import  './Sidebar.css'
import { Link } from 'react-router-dom'
import addproduct_icon from '../../assets/Product_Cart.svg'
import listproduct_icon from '../../assets/Product_list_icon.svg'

const Sidebar = () => {
  return (
    <div className='Sidebar' >
      <Link to={'/addproduct'}  style={{textDecoration:"none"}} >
      <div className="sidebar-item">
        <img src={addproduct_icon} alt="" />
        <p>
            Add Product
        </p>
      </div>
      </Link>

            <Link to={'/listproduct'}  style={{textDecoration:"none"}} >
      <div className="sidebar-item">
        <img src={listproduct_icon} alt="" />
        <p>
            Product list
        </p>
      </div>
      </Link>
    </div>
  )
}

export default Sidebar
