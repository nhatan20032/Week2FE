import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { addProduct, type Product } from "../redux/productSlice";
const productList: Product[] = [
  {
    id: nanoid(),
    name: "SD Gundam EX-Standard RX-78-2 Gundam / Hello Kitty",
    price: 680000,
    image:
      "https://m.media-amazon.com/images/I/71bM8OuBXSL._AC_UF894%2C1000_QL80_.jpg",
  },
  {
    id: nanoid(),
    name: "SD Gundam Cross Silhouette Gundam Barbatos Lupus Rex",
    price: 680000,
    image:
      "https://omochajapan.com/cdn/shop/files/sd-gundam-cross-silhouette-gundam-barbatos-lupus-rex-001.jpg?v=1719308674",
  },
  {
    id: nanoid(),
    name: "SDBD: R EX Valkylander",
    price: 680000,
    image: "https://p-bandai.com/img/us/p/m/N2569551001001_002.jpg",
  },
];

export default function ProductList() {
  const dispatch = useDispatch();

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      {productList.map((item) => (
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
            onClick={() => dispatch(addProduct(item))}
            className="border-0 p-3 bg-amber-100 rounded-2xl mt-4 hover:bg-amber-200 cursor-pointer w-full"
          >
            Thêm vào giỏ
          </button>
        </div>
      ))}
    </div>
  );
}
