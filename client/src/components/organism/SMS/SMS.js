import axios from 'axios';
import { Button } from 'components/atoms/Button/Button';
import FormField from 'components/molecules/FormField/FormField';
import React, { useState } from 'react';
import styled from 'styled-components';

const SMS = () => {
  const [inputId, setInputId] = useState('');
  const [smses, setSmses] = useState([]);

  const handleInputChange = (e) => setInputId(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`http://127.0.0.1:8000/api/sms/${inputId}`).then((response) => {
      setSmses(response.data.smses);
    });
    setInputId('');
  };
  return (
    <Container>
      <Form as="form" onSubmit={handleSubmit}>
        <FormField label="Type user id" id="userId" name="userId" value={inputId} onChange={handleInputChange} />
        <Button type="submit">Search</Button>
      </Form>
      <ScrollBox>
        {smses?.map((sms) => (
          <SmsBox>
            <p>
              Przypomnienie o umówionej wizycie u {sms.employee_profession}, {sms.employee_name} {sms.employee_second_name} w dniu: {sms.visit_date}.<br /> Do zobaczenia,
              <br /> firma NowMe.
            </p>
          </SmsBox>
        ))}
      </ScrollBox>
    </Container>
  );
};

export default SMS;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
  padding: 20px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ScrollBox = styled.div`
  width: 100%;
  height: 65vh;
  overflow-y: scroll;
`;

const SmsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 140px;
  background-color: #f7f8fa;
  padding: 20px 30px;
  border-radius: 25px;
  box-shadow: 0 5px 15px -10px rgba(0, 0, 0, 0.7);
  margin: 25px;
`;
