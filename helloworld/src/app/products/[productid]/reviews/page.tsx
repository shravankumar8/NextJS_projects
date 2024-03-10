import { notFound } from "next/navigation";
export default function review({params}){
  let pid = parseInt(params.productid);
  if (pid > 5) {
    notFound();
  }
    return (
      <div>
        <h1>the reviews for the product {params.productid} will be fetched </h1>
      </div>
    );
}