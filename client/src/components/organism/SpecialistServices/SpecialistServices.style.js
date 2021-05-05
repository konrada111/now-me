import styled from 'styled-components';

export const MainWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  max-height: 90vh;
  overflow: auto;
  width: 100%;
`;

export const Icon = styled.div`
  .MuiSvgIcon-root {
    font-size: 250px;
    color: ${({ theme }) => theme.colors.grey};
  }
  display: grid;
  place-items: center;
`;

export const Profile = styled.div``;

export const Services = styled.div``;

export const PersonalData = styled.p`
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  grid-row-start: 2;
  span {
    margin: 2px;
  }
`;

export const ProffesionName = styled.p`
  padding: 10px;
  display: grid;
  place-items: center;
  grid-row-start: 3;
`;
