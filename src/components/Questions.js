import React, { Fragment, useState } from 'react';
import { Button } from 'react-bootstrap';
import Timer from './Timer';
import Trivia from './Trivia';
import {useNavigate} from "react-router-dom";

const Questions = ({ qNumber, setQNumber }) => {
  const [stop, setStop] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="questions">
      {stop ? (
        <div className="end">
          <p>End the quiz you earned ${qNumber * 100}</p>
          <div className="start-buttons">
            <Button variant="outline-success" onClick={() => window.location.reload()}>Retry</Button>
            <Button variant="success" onClick={() => navigate("/settings")}>Start new quiz</Button>
          </div>
        </div>
      ) : (
        <Fragment>
          <Timer setStop={setStop} />
          <Trivia qNumber={qNumber} setQNumber={setQNumber} setStop={setStop} />
        </Fragment>
      )}
    </div>
  );
};

export default Questions;
