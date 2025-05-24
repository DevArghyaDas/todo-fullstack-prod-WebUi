import AddTodos from "@/components/AddTodos";
import TodoContent from "@/components/TodoContent";
import { Card, CardContent } from "@/components/ui/card";
import getAllTodo from "@/hooks/todo/getAllTodo";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "All Todos | Todo FS",
  };
};

const page = async () => {
  const { data, isError, error } = await getAllTodo();

  if (isError) {
    console.log(error);

    return null;
  }

  return (
    <>
      <section className="pb-2 pt-16">
        <AddTodos />
      </section>

      <section className="py-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-6">
              {data?.length === 0 && (
                <div className="text-center text-2xl">Todo not found</div>
              )}
              {data?.map((i) => {
                return <TodoContent key={i.id} content={i} />;
              })}
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default page;
