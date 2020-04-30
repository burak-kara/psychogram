import React, { useEffect, useState } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import { withFirebase } from '../../_firebase';

const FAQ = props => {
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        props.firebase.getFaqs().on('value', snapshot => {
            setFaqs(snapshot.val());
        });
    }, []);

    const renderAccordionItems = () =>
        faqs
            ? faqs.map(item => (
                  <AccordionItem>
                      <AccordionItemHeading>
                          <AccordionItemButton>
                              {item.question}
                          </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                          <p>{item.answer}</p>
                      </AccordionItemPanel>
                  </AccordionItem>
              ))
            : null;

    return (
        <div>
            <p>
                <Accordion>{renderAccordionItems()}</Accordion>
            </p>
        </div>
    );
};

export default withFirebase(FAQ);
