import type { Product } from "~/types/Product";
import { useDispatch } from "react-redux";
import { removeFromCart } from "~/redux/productSlice";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import { useRef } from "react";

type Props = {
  productData: Product[];
};

export default function SideBarItem({ productData }: Props) {
  const dispatch = useDispatch();
  const toast = useRef<Toast>(null);

  const showToast = (
    severity: "info" | "warn",
    summary: string,
    detail: string
  ) => {
    toast.current?.show({
      severity,
      summary,
      detail,
      life: 3000,
    });
  };

  const confirmDelete = (
    event: { currentTarget: any },
    itemId: number
  ) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Do you want to delete this record?",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: () => {
        dispatch(removeFromCart(itemId));
        showToast("info", "Confirmed", "Item removed from cart");
      },
      reject: () => {
        showToast("warn", "Rejected", "Delete cancelled");
      },
    });
  };

  const renderProductItem = (item: Product, index: number) => (
    <div key={index} className="mt-5">
      <div className="bg-black p-5 rounded-2xl shadow-lg shadow-black text-white ml-5">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold">{item.title}</h1>
          <button
            className="text-white text-xl cursor-pointer"
            onClick={(e) => confirmDelete(e, item.id)}
          >
            x
          </button>
        </div>
        <div className="grid grid-cols-2 items-center gap-x-7">
          <img className="w-fit" src={item.thumbnail} />
          <div className="flex flex-col gap-y-3">
            <p>
              <span className="text-yellow-100 font-bold">Brand</span>:{" "}
              {item.brand}
            </p>
            <p>
              <span className="text-yellow-100 font-bold">Category</span>:{" "}
              {item.category}
            </p>
            <p>
              <span className="text-yellow-100 font-bold">Stock</span>:{" "}
              {item.stock}
            </p>
            <p>
              <span className="text-yellow-100 font-bold">Price</span>:{" "}
              {item.price} $
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      <ConfirmPopup />
      {productData.map(renderProductItem)}
    </>
  );
}
