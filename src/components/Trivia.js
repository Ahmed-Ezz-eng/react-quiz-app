import React, { Fragment, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import delay from '../utils/delay';

const Trivia = ({ qNumber, setQNumber, setStop }) => {
  const { questions } = useSelector((state) => state.questionsSlice);
  const [question, setQuestion] = useState(questions[qNumber]);
  const [selectedAns, setSelectedAns] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [ansColors, setAnsColors] = useState('answer');

  useEffect(() => {
    if (questions.length) {
      setQuestion(questions[qNumber]);
      let res = questions[qNumber].incorrect_answers
        .concat(questions[qNumber].correct_answer)
        .sort(() => Math.random() - 0.5);
      setAnswers(res);
    }
  }, [qNumber, questions]);

  const handleClick = (answer) => {
    setSelectedAns(answer);
    if (answer === question.correct_answer) {
      setAnsColors('correct answer');
      delay(1200, () => {
        setQNumber((prev) => prev + 1);

        if (qNumber + 1 > questions.length - 1) {
          setStop(true);
        }
      });
    } else {
      setAnsColors('wrong answer');
      delay(2000, () => {
        setStop(true);
      });
    }
  };

  return (
    <div className="trivia">
      {questions.length > 0 && (
        <Fragment>
          <div className="question">
            <h2>{question.question}</h2>
          </div>

          <div className="answers">
            <Row>
              {answers.length &&
                answers.map((answer, index) => (
                  <Col
                    md={6}
                    xs={12}
                    key={index}
                    onClick={() => handleClick(answer)}
                  >
                    <div
                      className={selectedAns === answer ? ansColors : 'answer'}
                    >
                      {answer}
                    </div>
                  </Col>
                ))}
            </Row>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Trivia;
