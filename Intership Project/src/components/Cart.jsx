import { useDispatch, useSelector } from "react-redux"
import ItemsList from "./ItemsList"
import { clearCart } from "../utils/cartSlice"

const Cart = () =>{
  const cartItems = useSelector((store)=>store.cart.items)
  const dispatch = useDispatch()
  const handleClear = () =>{
     dispatch(clearCart())
  }
  return (
    <div className="text-center m-4 p-4">
      <h1 className="text-2xl font-bold ">Cart</h1>
      <div>
         <div>
          <button className="p-2 m-2 bg-black text-white rounded-lg" onClick={()=>handleClear()}>Clear Cart</button>
          {cartItems.length ===0 && (<h1>Please Add Items! </h1>) }
          <ItemsList items={cartItems}/> 
          
          
         </div>
      </div>
    </div>
  )
}

export default Cart