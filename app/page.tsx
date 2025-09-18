"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";

import z from "zod";

const formSchema = z.object({
  title: z.string().min(2, { message: "please enter a todo." }),
});

export default function Home() {
  const [todos, setTodos] = useState<string[]>([]);

  useEffect(() => {
    const todo = localStorage.getItem("todo");
    if (todo) {
      setTodos(JSON.parse(todo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify([...todos]));
  }, [todos]);

  const deleteTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const todoName = e.currentTarget.value;
    const filterTodo = todos.filter((item: string) => item !== todoName);
    // alert(todoName);
    setTodos(filterTodo);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "" },
  });

  function onReset(values: z.infer<typeof formSchema>) {
    const title: string = values.title;
    toast.success("Todo Added Successfully.");
    setTodos([...todos, title]);
    form.reset();
  }

  console.log(todos);
  return (
    <main className="container m-auto px-5">
      <Form {...form}>
        <Toaster richColors />
        <form
          onReset={form.handleSubmit(onReset)}
          className="space-y-4 w-lg m-auto mt-10  flex items-center justify-center gap-5"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full placeholder-shown:text-3xl">
                <FormLabel></FormLabel>
                <FormControl>
                  <Input placeholder="Add your task" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button type="reset">Add Task</Button>
          </div>
        </form>
      </Form>

      <section className="space-y-5 mt-10">
        {todos.map((title: string, index: number) => (
          <Card key={index}>
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <Button variant={"outline"} size={"sm"}>
                  {index + 1}
                </Button>
                <CardTitle className="capitalize">{title}</CardTitle>
              </div>
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={deleteTodo}
                value={title}
              >
                <Trash2 />{" "}
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
