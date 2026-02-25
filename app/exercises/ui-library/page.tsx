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

export default function ExerciseUiLibrary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Le projet utilise globalement HeroUI. Les éléments de cette page
          proviennent de Shadcn.
        </CardTitle>
      </CardHeader>
      <CardContent>
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
  );
}
