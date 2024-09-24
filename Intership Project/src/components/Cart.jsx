import {  useSelector } from "react-redux"
import ItemsList from "./ItemsList"
import { Link } from "react-router-dom"

const Cart = () =>{
  const cartItems = useSelector((store)=>store.cart.items)
  
  return (
    <div className="text-center m-4 p-4">
      <h1 className="text-2xl font-bold ">Cart</h1>
      <div>
         <div>
          {cartItems.length ===0 && (<h1>Please Add Items! </h1>) }
          <ItemsList items={cartItems}/> 
          
          
         </div>
      </div>

      <div>
        <Link to="/payment"><button className="p-2 m-2 bg-black text-white rounded-lg">Proceed to Payment</button></Link>
      </div>
    </div>
    
  )
}

export default Cart