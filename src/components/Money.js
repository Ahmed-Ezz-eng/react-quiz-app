import React from 'react';
import { useSelector } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

const Money = ({ qNumber }) => {
  const { questions } = useSelector((state) => state.questionsSlice);

  return (
    <ListGroup as="ul" className="money">
      {questions.length &&
        [...Array(questions.length + 1)].map((_, index) => (
          <ListGroup.Item
            as="li"
            className={`money-item ${index === qNumber && 'active'}`}
            key={index}
          >
            $ {index > 0 ? index * 100 : 0}
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};

export default Money;
