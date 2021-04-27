import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import OneSpecialist from '../components/molecules/Specialist/Specialist';
import SpecialistList from '../components/organism/SpecialistList/SpecialistList';
const Specialist = () => {
  const [specialists, setSpecialists] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredSpecialists, setFilteredSpecialists] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/employees')
      .then((res) => setSpecialists(res.data.employees))
      .catch((err) => console.log(err));
  }, []);

  const handleSelectChange = (e) => setSearchValue(e.target.value);

  useEffect(() => {
    const filteredSpecialists = specialists.filter((specialist) => specialist.profession.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1);
    setFilteredSpecialists(filteredSpecialists);
  }, [searchValue]);

  return (
    <Container>
      <h2>Our specialists</h2>
      <Input value={searchValue} placeholder="Choose your profession..." onChange={handleSelectChange} />
      {specialists.length !== 0 && searchValue.length === 0 ? <SpecialistList data={specialists} /> : null}
      {searchValue.length !== 0 ? <SpecialistList data={filteredSpecialists} /> : null}
      
    </Container>
  );
};
export default Specialist;

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: max-content;
  place-items: center;
`;

const Nothing = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  padding: 12px 45px;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  box-sizing: border-box;
  box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.09);
  border-radius: 10px;
  &:focus {
    outline: none;
    box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.3);
  }
`;
