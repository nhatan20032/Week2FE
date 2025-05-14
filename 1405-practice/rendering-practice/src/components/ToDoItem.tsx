type propsTodoItem = {
  todo: string[];
  setToDo: React.Dispatch<React.SetStateAction<string[]>>;
};
export default function TodoItem({ todo, setToDo }: propsTodoItem) {
  return (
    <div className="grid grid-cols-3 border-0 rounded-2xl shadow-2xl gap-4 p-10 w-full">
      {todo.map((item, key) => (
        <div
          key={key}
          className="flex justify-between items-center border-0 rounded-2xl shadow-2xl gap-4 p-10 w-full"
        >
          <div>{item}</div>
          <button
            onClick={() => {
              setToDo(todo.filter((a) => !a.includes(item)));
            }}
            className="border mt-1.5 p-2 rounded-lg bg-red-500 cursor-pointer text-white"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
