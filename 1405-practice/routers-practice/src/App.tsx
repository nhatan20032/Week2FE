import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import routes from "./routers/router";
import Header from "./home/Header";

function App() {
  const renderRouters =
    routes &&
    routes.map((route, index) => {
      return (
        <Route key={index} path={route.path} Component={route.component} />
      );
    });
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="flex flex-col w-full items-center mt-[50px]">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />}></Route>
            {renderRouters}
            <Route path="*" element={<Navigate to="/default-page" />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
