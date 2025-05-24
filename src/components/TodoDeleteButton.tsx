import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import deleteTodo from "@/hooks/todo/deleteTodo";
import { toast } from "react-toastify";
import { todoRefetchAction } from "@/hooks/actions";
import { useState } from "react";

type TodoDeleteButtonProps = {
  todoId: string;
};

const TodoDeleteButton = ({ todoId }: TodoDeleteButtonProps) => {
  const [load, setLoad] = useState(false);

  const deleteTodofunc = async () => {
    setLoad(true);

    const { success, message } = await deleteTodo(todoId);

    if (!success) {
      toast.error(message);
    }

    if (success) {
      toast.success(message);
      await todoRefetchAction();
    }

    setLoad(false);
  };

  return (
    <>
      <Button variant="destructive" onClick={deleteTodofunc} disabled={load}>
        <Trash2 />
      </Button>
    </>
  );
};

export default TodoDeleteButton;
