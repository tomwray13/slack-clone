"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Button } from "../components/ui/button";
import { Input } from "./ui/input";
import useSocketStore from "../store/socket.store";

const SendMessage = ({ channelId }: { channelId: number }) => {
  const FormSchema = z.object({
    message: z.string().optional(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: ``,
    },
  });

  const sendMessage = useSocketStore((state) => state.sendMessage);
  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!data.message) return;
    sendMessage({
      content: data.message,
      channelId,
      userId: 1,
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
