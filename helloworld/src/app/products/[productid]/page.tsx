import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: {
    productid: string;
  };
};
export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `product ${params.productid}`,
  };
};
export default function product({ params }: Props) {
  let pid = parseInt(params.productid);
  if (pid > 5) {
    notFound();
  }
  return (
    <div>
      <h1>the product id is {pid}</h1>
    </div>
  );
}
