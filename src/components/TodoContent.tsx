"use client";
import { todoRefetchAction } from "@/hooks/actions";
import kyClient from "@/lib/ky/kyClient";
import { TodoType } from "@/lib/types";
import { useState } from "react";
import TodoDeleteButton from "./TodoDeleteButton";
import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

type TodoContentProps = {
  content: TodoType;
};

const TodoContent = ({ content }: TodoContentProps) => {
  const [pending, setPending] = useState<boolean>(false);

  const toggleCheck = async (checked: boolean) => {
    setPending(true);

    await kyClient.patch(`items/todolist/${content.id}`, {
      json: {
        todoCheck: checked,
      },
    });

    await todoRefetchAction();

    setPending(false);
  };

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Checkbox
                id="todoCheck"
                className="accent-red-600"
                value={`${content.todoCheck}`}
                onCheckedChange={(c: boolean) => toggleCheck(c)}
                disabled={pending}
              />
              <Label
                className={`text-lg ${content.todoCheck && "line-through"} decoration-foreground decoration-4`}
                htmlFor="todoCheck"
              >
                {content.todoBody}
              </Label>
            </div>

            <TodoDeleteButton todoId={content.id} />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TodoContent;
