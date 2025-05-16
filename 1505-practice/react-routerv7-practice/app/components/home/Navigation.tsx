import { Menubar } from "primereact/menubar";
import type { MenuItem } from "primereact/menuitem";
import { Avatar } from "primereact/avatar";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "~/redux/store";
import SideBarItem from "./sidebar-item";

export default function Navigation() {
  const [visibleRight, setVisibleRight] = useState<boolean>(false);
  const items: MenuItem[] = [
    {
      label: "Home",
      icon: "pi pi-home",
      url: "/"
    },
    {
      label: "Product",
      icon: "pi pi-box",
      url: "/product"
    },
    {
      label: "About",
      icon: "pi pi-info-circle",
      url: "/about"
    },
    {
      label: "Contact",
      icon: "pi pi-envelope",
      url: "/contact"
    },
  ];

  const imagePath: string = "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
  
  const end = (
    <div className="flex align-items-center gap-2">
      <Avatar
        className="cursor-pointer"
        onClick={() => {
          setVisibleRight(true);
        }}
        image={imagePath}
        shape="circle"
      />
    </div>
  );

  const productStoreData = useSelector(
    (state: RootState) => state.product.cart
  );

  return (
    <>
      <div className="border-0 rounded-b-2xl">
        <Menubar model={items} end={end}></Menubar>
      </div>

      <div className="flex justify-center">
        <Sidebar
          visible={visibleRight}
          position="right"
          onHide={() => setVisibleRight(false)}
        >
          <SideBarItem productData={productStoreData} />
        </Sidebar>
      </div>
    </>
  );
}
