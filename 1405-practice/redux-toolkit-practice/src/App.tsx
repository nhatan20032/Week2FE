import { Provider } from "react-redux";
import ProductList from "./components/ProductList";
import Cart from "./components/Card";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <ProductList />
      <Cart />
    </Provider>
  );
}

export default App;
