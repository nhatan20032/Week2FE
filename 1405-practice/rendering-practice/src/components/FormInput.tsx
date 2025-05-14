import { useState } from "react";
import TodoItem from "./ToDoItem";
import FormTodo from "./FormTodo";

export default function FormInput() {
  const [toDo, setToDo] = useState<string[]>([]);

  return (
    <div className="mt-10 p-10 gap-20 flex flex-col items-center">
      <FormTodo setToDo={setToDo}></FormTodo>
      <TodoItem todo={toDo} setToDo={setToDo}></TodoItem>
    </div>
  );
}
