"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { PlusSquare } from "lucide-react";
import { useState } from "react";
import useChannelStore from "../store/channels.store";

const FormSchema = z.object({
  channel: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  channelDescription: z.string().optional(),
});

export function AddChannel() {
  const [open, setOpen] = useState(false);
  const addChannel = useChannelStore((state) => state.addChannel);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      channel: ``,
      channelDescription: ``,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    addChannel({
      id: 1,
      name: data.channel,
      description: data.channelDescription,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setOpen(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <PlusSquare className="mr-2 h-4 w-4" />
          Add new channel
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add new channel</AlertDialogTitle>
          <AlertDialogDescription>
            Create a new publically available channel
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="channel"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Channel name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. general" autoFocus {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="channelDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. discuss all things"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="submit">Create channel</Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
