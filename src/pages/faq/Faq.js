import React, { useEffect, useState } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import { withFirebase } from '../../_firebase';
import { LoadingPage } from '../../components/Loadings';

const FAQ = props => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        props.firebase.getFaqs().on('value', snapshot => {
            setFaqs(snapshot.val());
            setLoading(false);
        });
    }, [props.firebase]);

    const renderAccordionItems = () =>
        !loading ? (
            faqs.map(item => (
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
        ) : (
            <LoadingPage />
        );

    return <Accordion>{renderAccordionItems()}</Accordion>;
};

export default withFirebase(FAQ);
