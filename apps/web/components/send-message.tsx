"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Button } from "../components/ui/button";
import { Input } from "./ui/input";
import useMessageStore from "../store/messages.store";

const SendMessage = () => {
  const messagesInState = useMessageStore((state) => state.messages);
  const addMessage = useMessageStore((state) => state.addMessage);

  const FormSchema = z.object({
    message: z.string().optional(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: ``,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!data.message) return;
    addMessage({
      id: messagesInState.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      text: data.message,
      user: {
        id: 700,
        firstName: `John`,
        lastName: `Doe`,
      },
    });
    form.reset();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="flex w-full items-center space-x-2">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Start typing..." autoFocus {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Send</Button>
        </div>
      </form>
    </Form>
  );
};

export { SendMessage };
