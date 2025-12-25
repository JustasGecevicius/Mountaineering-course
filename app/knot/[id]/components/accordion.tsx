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
            {item.contentText && <AccordionContent>{item.contentText}</AccordionContent>}
            {item.contentElements && (
              <AccordionContent>
                {item.contentElements.map((element) => (
                  <a href={`/knot/${element.id}`} key={element.id}>
                    {element.name}
                  </a>
                ))}
              </AccordionContent>
            )}
          </AccordionItem>
        ))}
    </Accordion>
  );
};
