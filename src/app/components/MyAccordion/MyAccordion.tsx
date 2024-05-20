'use client';

import './MyAccordion.scss';
import * as Accordion from '@radix-ui/react-accordion';
import PlusIcon from '@/assets/icons/plus-icon.svg';

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
      {[...Array(2)].map((_column, columnIndex) => (
        <div
          className="AccordionColumn"
          key={`accordion-${columnIndex}`}
          tabIndex={-1}
        >
          {accordionData
            .slice(
              (columnIndex * accordionData.length) / 2,
              (columnIndex * accordionData.length) / 2 +
                accordionData.length / 2
            )
            .map(item => (
              <Accordion.Item
                className="AccordionItem"
                value={item.header}
                key={item.header}
              >
                <Accordion.Header>
                  <Accordion.Trigger className="AccordionTrigger">
                    <span>{item.header}</span>
                    <PlusIcon className="AccordionIcon" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="AccordionContent">
                  <p>{item.content}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
        </div>
      ))}
    </Accordion.Root>
  );
}
