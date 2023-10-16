"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import React, { useEffect } from "react";
import { Button } from "../components/ui/button";
import useMessageStore from "../store/messages.store";
import { Input } from "./ui/input";
import { ChannelWithMessages } from "../data";
import { Messages } from "./messages";

const Chat = ({ channel }: { channel: ChannelWithMessages }) => {
  // set messages state in the store
  useEffect(() => {
    useMessageStore.setState({ messages: channel.messages });
  }, [channel.messages]);
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
    <>
      <div className="overflow-y-auto flex-grow p-8 flex flex-col-reverse space-y-reverse space-y-6">
        <Messages />
      </div>
      <div className="sticky bottom-0 w-full p-8 border-t">
        {/* Fixed content at the bottom */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="flex w-full items-center space-x-2">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder="Start typing..."
                        autoFocus
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Send</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export { Chat };
