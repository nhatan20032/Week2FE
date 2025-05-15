import { Provider } from "react-redux";
import store from "./redux/store"
import CardProduct from "./components/CardProduct";
import Cart from "./components/Cart";

function App() {
  return <>
  <Provider store={store}>
    <CardProduct />
    <Cart/>
  </Provider>
  </>;
}

export default App;
