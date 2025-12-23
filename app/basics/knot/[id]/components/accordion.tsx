import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type AccordionComponentPropsType = {
  data: {
    triggerText: string;
    contentText: string;
  }[];
};

export const AccordionComponent = (props: AccordionComponentPropsType) => {
  const { data } = props;
  return (
    <Accordion type="multiple">
      {Array.isArray(data) &&
        data.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{item.triggerText}</AccordionTrigger>
            <AccordionContent>{item.contentText}</AccordionContent>
          </AccordionItem>
        ))}
    </Accordion>
  );
};
