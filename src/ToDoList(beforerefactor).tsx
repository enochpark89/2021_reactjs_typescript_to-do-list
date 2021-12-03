import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

interface IForm {
  toDo: string;
}

interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

function ToDoList() {
  // creaqte a recoil that will be used to store the todo list.
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue, watch } = useForm<IForm>();
  
  // Validate Typescript with IForm interface.
  // setToDos will basically add the text, id(randomly generated) and category to the todo list.
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldToDos,
    ]);
    // This function allows you to dynamically set the value of a registered field. At the same time, it tries to avoid unnecessary rerender.
    setValue("toDo", "");
  };
  console.log(toDos);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", {
            required: "Please write a To Do",
          })}
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;