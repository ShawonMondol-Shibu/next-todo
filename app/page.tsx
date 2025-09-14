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
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  title: z.string().min(2, { message: "please enter a todo." }),
});

export default function Home() {
  const [todos, setTodos] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const title: string = values.title;
    setTodos([...todos, title]);
  }

  return (
    <main className="container m-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-md m-auto flex items-center justify-center gap-5"
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
            <Button type="submit">Add Task</Button>
          </div>
        </form>
      </Form>

      <section>
        {todos.map((title, index) => (
          <Card key={index}>
            <CardContent className="flex items-center gap-5">
              <Button variant={"outline"} size={"sm"}>
                {index + 1}
              </Button>
              <CardTitle>{title}</CardTitle>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
