import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "~/redux/store";
import { Paginator } from "primereact/paginator";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { addToCart } from "~/redux/productSlice";
import axios from "axios";
import apiUrls from "~/types/ApiUrl";
import type { Route } from "./+types/info";
import { useNavigate } from "react-router";
import type { Product } from "~/types/Product";
import confetti from "canvas-confetti";

export async function loader({ params }: Route.LoaderArgs) {
  const productId = params.productId;
  return { productId };
}

export default function ProductInfo({ loaderData }: Route.ComponentProps) {
  const [product, setProduct] = useState<Product>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [first, setFirst] = useState(0);

  const productStoreData = useSelector(
    (state: RootState) => state.product.product
  );

  useEffect(() => {
    if (productStoreData == null) {
      const id = Number(loaderData.productId);
      if (isNaN(id)) {
        navigate("/");
        return;
      }
      axios
        .get(apiUrls.getProductById(id))
        .then((res) => setProduct(res.data))
        .catch(() => navigate("/"));
    } else {
      setProduct(productStoreData);
    }
  }, [loaderData, productStoreData]);

  const onPageChange = (event: { first: number }) => {
    setFirst(event.first);
  };

  const currentImage = product?.images?.[first];

  const firework = () => {
    for (let i = 0; i < 5; i++) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.6,
        },
      });
    }
  };

  function InfoBlock({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) {
    return (
      <div className="bg-black p-5 rounded-2xl shadow-lg shadow-black text-white ml-5">
        <h1 className="text-xl font-bold mb-2">{title}</h1>
        {children}
      </div>
    );
  }

  const renderText = (label: string, value?: string | number) => (
    <p>
      <span className="text-yellow-100 font-bold">{label}</span>: {value}
    </p>
  );

  return (
    <div className="flex justify-center rounded-2xl items-start border-0 p-5 m-5 shadow-2xl shadow-[#EFA7B5] bg-[#EFA7B5]">
      <div className="flex flex-col items-center w-2/3 gap-4">
        <Paginator
          first={first}
          rows={1}
          totalRecords={product?.images?.length || 0}
          onPageChange={onPageChange}
          template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        />
        {currentImage && (
          <img
            className="w-2/3"
            src={currentImage}
            alt={`Product image ${first + 1}`}
          />
        )}
      </div>
      <div className="flex flex-col w-1/3 gap-5">
        <InfoBlock title={product?.title ?? ""}>
          <p>{product?.description}</p>
        </InfoBlock>
        <InfoBlock title="Information">
          {renderText("Brand", product?.brand)}
          {renderText("Category", product?.category)}
          {renderText("Stock", product?.stock)}
          {renderText("Price", `${product?.price} $`)}
        </InfoBlock>
        <InfoBlock title="Rating of product">
          <Rating value={product?.rating} readOnly cancel={false} />
        </InfoBlock>
        <InfoBlock title="Reviews">
          {product?.reviews.map((item, i) => (
            <div key={i}>
              <h1 className="text-xl font-bold mb-2">{item.reviewerName}</h1>
              <Rating value={item.rating} readOnly cancel={false} />
              {renderText("Comment", item.comment)}
            </div>
          ))}
        </InfoBlock>
        <InfoBlock title="">
          <Button
            label="Add to Cart"
            className="w-full custom-bg"
            raised
            icon="pi pi-shopping-cart"
            onClick={() => {
              dispatch(addToCart(product!));
              firework();
            }}
          />
        </InfoBlock>
      </div>
    </div>
  );
}
