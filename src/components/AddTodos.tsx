"use client";

import { TodoFormType } from "@/lib/types";
import { todoFormSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, NotebookPen } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import addTodo from "@/hooks/todo/addTodo";
import { toast } from "react-toastify";
import { todoRefetchAction } from "@/hooks/actions";

const AddTodos = () => {
  const rhform = useForm<TodoFormType>({
    defaultValues: {
      todoBody: "",
    },
    resolver: zodResolver(todoFormSchema),
    mode: "all",
  });

  const { isSubmitting, isValid } = rhform.formState;

  const todoFormFunc = async (tData: TodoFormType) => {
    const { message, success } = await addTodo(tData);

    if (!success) {
      toast.error(message);
    }

    if (success) {
      rhform.reset();
      toast.success(message);

      await todoRefetchAction();
    }
  };

  return (
    <>
      <Form {...rhform}>
        <form onSubmit={rhform.handleSubmit(todoFormFunc)}>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <FormField
                  control={rhform.control}
                  name="todoBody"
                  render={({ field }) => (
                    <FormItem className="col-span-1 sm:col-span-3">
                      <FormControl>
                        <Input placeholder="Write Your Todo Here" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="w-full" disabled={!isValid || isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <NotebookPen />
                  )}
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default AddTodos;
