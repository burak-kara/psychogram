import React, { useEffect, useState } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import { withFirebase } from '../../_firebase';
import { Link, withRouter } from 'react-router-dom';

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
        <footer>
            <p>
                <Accordion>{renderAccordionItems()}</Accordion>

                <h>
                    <Link
                        id="about-us"
                        className="common-link"
                        to={'/about-us'}
                    >
                        About Us
                    </Link>
                </h>
                <h>
                    <Link id="contact" className="common-link" to={'/contact'}>
                        Contact
                    </Link>
                </h>

                <Link id="faq" className="common-link" to={'/faq'}>
                    FAQ
                </Link>
                <Link id="home" className="common-link" to={''}>
                    Home
                </Link>
                <Link id="home" className="common-link" to={'/sign-in'}>
                    Sign in
                </Link>
            </p>
        </footer>
    );
};

export default withFirebase(FAQ);
