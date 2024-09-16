import { useEffect, useState } from "react"
import { MENU_API  } from "./constants"

const useRestaurantMenu = (resId) =>{

  const [resInfo, setResInfo] = useState(null)


  useEffect(()=>{
    fetchdata()
  },[])
 
  const fetchdata = async()=>{
    try {
    const data = await fetch(MENU_API + resId)
    const json = await data.json()
    setResInfo(json.data)
    } catch (e) {
      console.log(e);
    }
  }

   return resInfo
}
export default useRestaurantMenu