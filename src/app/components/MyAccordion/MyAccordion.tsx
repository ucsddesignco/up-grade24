'use client';

import Image from 'next/image';
import './MyAccordion.scss';
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
    <Accordion.Root className="AccordionRoot" type="single" collapsible={true}>
      {accordionData.map(item => (
        <Accordion.Item
          className="AccordionItem"
          value={item.header}
          key={item.header}
        >
          <Accordion.Header>
            <Accordion.Trigger className="AccordionTrigger">
              <span>{item.header}</span>
              {/* TODO: maybe consider just inserting svg directly */}
              <Image
                className="AccordionIcon"
                src="./icons/plus.svg"
                alt=""
                width={18}
                height={18}
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="AccordionContent">
            <p>{item.content}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
