'use client';

import './MyAccordion.scss';
import * as Accordion from '@radix-ui/react-accordion';
import PlusIcon from '@/assets/icons/plus-icon.svg';
import { useRef, useState } from 'react';
import { useSetAdjacentTriggerHeight } from './hooks/useSetAdjacentTriggerHeight';

export type AccordionDataItem = {
  id: string;
  header: string;
  content: string;
};

type AccordionTabProps = {
  accordionData: Array<AccordionDataItem>;
};

const COLUMN_COUNT = 2;

export default function MyAccordion({ accordionData }: AccordionTabProps) {
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // Ensures that the height of adjacent accordion triggers are the same
  useSetAdjacentTriggerHeight({ triggerRefs, accordionData, COLUMN_COUNT });

  // const [isAllExpanded, setIsAllExpanded] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleExpandAll = () => {
    if (expandedItems.length === accordionData.length) {
      setExpandedItems([]); // Collapse all items
    } else {
      setExpandedItems(accordionData.map(item => `accordion-${item.id}`)); // Expand all items
    }
  };

  return (
    <>
      <button onClick={handleExpandAll}>
        {expandedItems.length === accordionData.length
          ? 'Collapse All'
          : 'Expand All'}
      </button>

      <Accordion.Root
        className="AccordionRoot"
        type={'multiple'}
        value={expandedItems}
        onValueChange={setExpandedItems}
      >
        {[...Array(COLUMN_COUNT)].map((_column, columnIndex) => (
          <div
            className="AccordionColumn"
            key={`accordion-col-${columnIndex}`}
            tabIndex={-1}
          >
            {accordionData
              .slice(
                (columnIndex * accordionData.length) / COLUMN_COUNT,
                (columnIndex * accordionData.length) / COLUMN_COUNT +
                  accordionData.length / COLUMN_COUNT
              )
              .map((item, rowIndex) => (
                <Accordion.Item
                  className="AccordionItem"
                  value={`accordion-${item.id}`}
                  key={`accordion-${item.id}`}
                >
                  <Accordion.Header>
                    <Accordion.Trigger
                      className="AccordionTrigger"
                      ref={element => {
                        triggerRefs.current[
                          (columnIndex * accordionData.length) / 2 + rowIndex
                        ] = element;
                      }}
                    >
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
    </>
  );
}
