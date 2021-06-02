import { Button } from 'components/atoms/Button/Button';
import FormField from 'components/molecules/FormField/FormField';
import React, { useState } from 'react';
import styled from 'styled-components';

const SMS = () => {
  const [inputId, setInputId] = useState('');

  const handleInputChange = (e) => setInputId(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputId);
    setInputId('');
  };
  return (
    <Container>
      <Form as="form" onSubmit={handleSubmit}>
        <FormField label="Type user id" id="userId" name="userId" value={inputId} onChange={handleInputChange} />
        <Button type="submit">Search</Button>
      </Form>
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
