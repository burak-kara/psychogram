import React, { useEffect, useState } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import { compose } from 'recompose';
import { withAuthorization } from '../../_session';

const FAQ = props => {
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        props.firebase.getFaqs().on('value', snapshot => {
            setFaqs(snapshot.val());
        });
    }, [props.firebase]);

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

    return <Accordion>{renderAccordionItems()}</Accordion>;
};
const condition = authUser => authUser;

export default compose(withAuthorization(condition))(FAQ);
