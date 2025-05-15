import { Link } from "react-router-dom";

const menu = [
  {
    name: "Home",
    to: "/home",
  },
  {
    name: "About",
    to: "/about",
  },
  {
    name: "Contact",
    to: "/contact",
  },
];

export default function Header() {
  const showMenu =
    menu &&
    menu.map((menuItem, index) => {
      return (
        <button type="button" key={index} className="p-4 border-0">
          <Link to={menuItem.to}>
            <span className="text-black font-bold">{menuItem.name}</span>
          </Link>
        </button>
      );
    });
  return (
    <div className="w-full border-0 shadow-2xl flex justify-start rounded-b-3xl">
      {showMenu}
    </div>
  );
}
