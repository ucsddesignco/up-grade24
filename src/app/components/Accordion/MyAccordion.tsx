'use client';

import * as Accordion from '@radix-ui/react-accordion';

type AccordionDataItem = {
  id: string;
  header: string;
  content: string;
};

type AccordionTabProps = {
  accordionData: Array<AccordionDataItem>;
};

export default function MyAccordion({ accordionData }: AccordionTabProps) {
  return (
    <Accordion.Root type="single" collapsible={true}>
      {accordionData.map(item => (
        <Accordion.Item value={item.header} key={item.header}>
          <Accordion.Header>
            <Accordion.Trigger>
              <span>{item.header}</span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <p>{item.content}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
