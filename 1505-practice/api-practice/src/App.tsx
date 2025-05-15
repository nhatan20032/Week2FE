import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

function App() {
  const [user, setUser] = useState<User[]>([]);
  function getDataWithAxios() {
    const data = axios
      .get("https://api.escuelajs.co/api/v1/users")
      .then(function (response) {
        setUser(response.data);
      });
    return data;
  }
  useEffect(() => {
    getDataWithAxios();
  }, []);
  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap shadow-2xl border-0 max-w-5xl rounded-2xl p-10 gap-5">
        {user.map((item) => {
          return (
            <div
              key={item.id}
              className="shadow-2xl border-0 w-full sm:w-[48%] rounded-2xl p-5"
            >
              <span className="break-words">
                {item.name} - {item.email}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
