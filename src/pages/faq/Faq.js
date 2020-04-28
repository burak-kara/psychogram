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
        <div>
            <p>
                <Accordion>{renderAccordionItems()}</Accordion>
            </p>
            <footer>
                <p>
                    <h>Useful Links</h>
                </p>
                <p>
                    <Link
                        id="about-us"
                        className="common-link"
                        to={'/about-us'}
                    >
                        About Us
                    </Link>
                </p>
                <p>
                    <Link id="contact" className="common-link" to={'/contact'}>
                        Contact
                    </Link>
                </p>
                <p>
                    <Link id="faq" className="common-link" to={'/faq'}>
                        FAQ
                    </Link>
                </p>
                <p>
                    <Link id="home" className="common-link" to={''}>
                        Home
                    </Link>
                </p>
                <p>
                    <Link id="home" className="common-link" to={'/sign-in'}>
                        Sign in
                    </Link>
                </p>
            </footer>
        </div>
    );
};

export default withFirebase(FAQ);
