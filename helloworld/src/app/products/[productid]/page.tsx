import { notFound } from "next/navigation"
export default function product({params}:{productid:string}){
    let pid=parseInt(params.productid)
    if (pid>5){
notFound()
    }
      return (
        <div>
          <h1>the product id is {pid}</h1>
        </div>
      );
}