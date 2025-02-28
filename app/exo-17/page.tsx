"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function Exo17() {
  const form = useForm({
    defaultValues: {
      foo: "bar",
    },
  });

  return (
    <main className="mx-auto max-w-7xl p-12 text-center">
      <h1 className="text-7xl font-bold">Exercice 17</h1>

      <Card>
        <CardHeader>
          <CardTitle>Un formulaire</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <Form>
            <FormField
              control={form.control}
              name="foo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form> */}
          <Calendar />
          <Button>Un bouton</Button>
          <Accordion type="multiple">
            <AccordionItem value="item-1">
              <AccordionTrigger>Une question ?</AccordionTrigger>
              <AccordionContent>Une réponse.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Une autre question ?</AccordionTrigger>
              <AccordionContent>Une autre réponse.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Une dernière ?</AccordionTrigger>
              <AccordionContent>Allez.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Link
        href="/"
        className="mt-12 inline-block rounded bg-indigo-500 px-4 py-2 text-2xl font-bold text-white"
      >
        Aller à l&apos;accueil
      </Link>
    </main>
  );
}
