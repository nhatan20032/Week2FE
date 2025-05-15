import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { Product } from "../types/Product";
import { remove } from "../redux/action";

export default function Cart() {
  const products = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();

  function removeProduct(product: Product) {
    dispatch(remove(product));
  }
  return (
    <>
      <div className="flex w-full items-center justify-center m-5">
        <h1 className="font-bold text-[30px]">Giỏ hàng</h1>
      </div>
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {products.map((item) => (
          <div
            key={item.id}
            className="border-0 h-fit w-full max-w-[400px] rounded-3xl shadow-xl shadow-blue-300 p-5"
          >
            <h1 className="text-lg font-semibold mb-2">
              {item.name} /{" "}
              <span className="text-amber-700">
                {item.price.toLocaleString()}₫
              </span>
            </h1>
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-auto rounded-3xl"
            />
            <button
              onClick={() => {
                const confirmDelete = window.confirm(
                  "Bạn có chắc muốn xoá sản phẩm này?"
                );
                if (confirmDelete) {
                  removeProduct(item);
                }
              }}
              className="border-0 p-3 bg-red-100 rounded-2xl mt-4 hover:bg-red-200 cursor-pointer w-full"
            >
              Xoá khỏi giỏ hàng
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
