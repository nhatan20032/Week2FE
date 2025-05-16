import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "~/redux/store";
import { Paginator } from "primereact/paginator";
import { useState } from "react";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";

export default function ProductInfo() {
  const product = useSelector((state: RootState) => state.product.product);
  const dispatch = useDispatch();
  const [first, setFirst] = useState(0);

  const onPageChange = (event: { first: number }) => {
    setFirst(event.first);
  };

  const currentImage = product?.images?.[first];

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
        <div className="bg-black p-5 rounded-2xl shadow-lg shadow-black text-white ml-5">
          <h1 className="text-xl font-bold mb-2">{product?.title}</h1>
          <p>{product?.description}</p>
        </div>
        <div className="bg-black p-5 rounded-2xl shadow-lg shadow-black text-white ml-5">
          <h1 className="text-xl font-bold mb-2">Information</h1>
          <p>
            <span className="text-yellow-100 font-bold">Brand</span>:{" "}
            {product?.brand}
          </p>
          <p>
            <span className="text-yellow-100 font-bold">Category</span>:{" "}
            {product?.category}
          </p>
          <p>
            <span className="text-yellow-100 font-bold">Stock</span>:{" "}
            {product?.stock}
          </p>
          <p>
            <span className="text-yellow-100 font-bold">Price</span>:{" "}
            {product?.price} $
          </p>
        </div>
        <div className="bg-black p-5 rounded-2xl shadow-lg shadow-black text-white ml-5">
          <h1 className="text-xl font-bold mb-2">Rating of product</h1>
          <Rating value={product?.rating} readOnly cancel={false}></Rating>
        </div>
        <div className="bg-black flex flex-col p-4 gap-y-5 rounded-2xl shadow-lg shadow-black text-white ml-5">
          {product?.reviews.map((item, index) => {
            return (
              <div key={index}>
                <h1 className="text-xl font-bold mb-2">{item.reviewerName}</h1>
                <Rating value={item?.rating} readOnly cancel={false}></Rating>
                <p>
                  <span className="text-yellow-100 font-bold">Comment</span>:{" "}
                  {item.comment}
                </p>
              </div>
            );
          })}
        </div>
        <div className="bg-black p-5 rounded-2xl shadow-lg shadow-black text-white ml-5">
          <Button
            label="Add to Cart"
            className="w-full custom-bg"
            raised
            icon="pi pi-shopping-cart"            
          />
        </div>
      </div>
    </div>
  );
}
