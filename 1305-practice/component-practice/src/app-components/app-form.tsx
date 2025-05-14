import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AppModal } from "./app-modal";
import { useState } from "react";

const formSchema = z.object({
  username: z
    .string({
      message: "Username must be string value",
    })
    .min(2, {
      message: "Username must be at least 2 characters",
    })
    .max(50, {
      message: "Username must be less than 50 characters",
    })
});

export function AppForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  function onSubmit(value: z.infer<typeof formSchema>) {
    setOpen(true);
    setName(value.username);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="username">Username</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    type="text"
                    id="username"
                    placeholder="username..."
                    {...field}
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="cursor-pointer" type="submit">
            Submit
          </Button>
        </form>
      </Form>
      <AppModal open={open} name={name} onClose={() => setOpen(false)}></AppModal>
    </>
  );
}
