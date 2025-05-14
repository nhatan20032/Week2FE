import { z } from "zod";

type FormTodo = {
  setToDo: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function FormTodo({ setToDo }: FormTodo) {
  function createTodo(formData: FormData) {
    const todo = formData.get("todo");
    const schemaString = z.string().min(1, "Không được để trống");
    const result = schemaString.safeParse(todo);

    if (!result.success) {
      alert(result.error.errors[0].message);
      return;
    }

    setToDo((prev) => [...prev, result.data]);
  }
  return (
    <div className="flex border-0 rounded-2xl shadow-2xl gap-4 p-10 w-1/2">
      <form
        action={createTodo}
        className="w-full border-1 border-dashed rounded-2xl p-3"
      >
        <label htmlFor="todoText">Todo</label>
        <input
          id="todoText"
          name="todo"
          type="text"
          required
          placeholder="Input To Do............."
          className="mt-3 py-1.5 block border-1 pl-2 w-full border-solid text-gray-900 placeholder:text-gray-400 text-base"
        />
        <button
          type="submit"
          className="border-1 mt-1.5 p-2 rounded-lg bg-amber-50 cursor-pointer"
        >
          Thêm ToDo
        </button>
      </form>
    </div>
  );
}
