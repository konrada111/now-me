import React from 'react';
import styled from 'styled-components';
import OneSpecialist from '../../molecules/Specialist/Specialist';

function SpecialistList({ data }) {
  return (
    <>
      <Wrapper>
        {data.map((specialist) => (
          <OneSpecialist key={specialist.id} data={specialist} />
        ))}
      </Wrapper>
      {data.length === 0 ? <h3>Nothing here</h3> : null}
    </>
  );
}

export default SpecialistList;

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: max-content;
  place-items: center;
`;
