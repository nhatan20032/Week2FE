import { AppForm } from "./app-components/app-form";

function App() {
  return (
    <div className="flex flex-col items-center">
      <div className="border-2 border-solid w-1/2 p-10 rounded-2xl shadow-blue-600 shadow-xl/30  mt-10">
        <AppForm></AppForm>
      </div>
    </div>
  );
}

export default App;
