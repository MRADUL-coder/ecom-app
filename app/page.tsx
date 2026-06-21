import { fetchProducts } from "@/controller/product.controller"
import Products from "../components/Products"

export const revalidate = 20

const HomeRouter = async ()=>{
 const data = await fetchProducts()
 return <Products data={data}/>
}
export default HomeRouter