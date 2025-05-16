import { useEffect, useState } from "react";
import { Paginator } from "primereact/paginator";
import { ProgressSpinner } from "primereact/progressspinner";
import axios from "axios";
import type { Product } from "~/types/Product";
import apiUrls from "~/types/ApiUrl";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setProduct } from "~/redux/productSlice";
import { InputText } from "primereact/inputtext";

type paginationProps = {
  limit: number;
  skip: number;
  search: string;
};

export default function ListProduct() {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function getProduct({ limit, skip, search }: paginationProps) {
    setLoading(true);
    try {
      const res = await axios.get(apiUrls.getProducts(limit, skip, search));
      return res;
    } finally {
      setLoading(false);
    }
  }

  const onPageChange = (event: { first: number; rows: number }) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProduct({
        limit: rows,
        skip: first,
        search: debouncedSearch,
      });
      setProducts(response.data.products);
      setTotal(response.data.total);
    };
    fetchData();
  }, [first, rows, debouncedSearch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setFirst(0);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  return (
    <>
      <div className="flex flex-col gap-y-10 p-5 items-center">
        <div className="flex w-full justify-end">
          <InputText
            id="search"
            placeholder="Search"
            className="w-[30%]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-5 gap-10 border-0 p-10 bg-[#EFA7B5] shadow-2xl shadow-[#ec788f] rounded-2xl">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <ProgressSpinner />
            </div>
          ) : (
            products.map((item) => {
              return (
                <div
                  onClick={() => {
                    dispatch(setProduct(item));
                    navigate(`/product/${item.id}`);
                  }}
                  key={item.id}
                  className="flex flex-col justify-center bg-[#000000] items-center border-0 p-5 shadow-lg shadow-[#000000] rounded-2xl hover:cursor-pointer"
                >
                  <img src={item.thumbnail} alt={item.title}></img>
                  <h1 className="font-bold italic text-[#EFA7B5]">
                    {item.title}
                  </h1>
                </div>
              );
            })
          )}
        </div>
        <Paginator
          className="shadow-[#EFA7B5] border-0 shadow-2xl bg-[#EFA7B5]"
          first={first}
          rows={rows}
          totalRecords={total}
          rowsPerPageOptions={[10, 20, 30, 40]}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}
