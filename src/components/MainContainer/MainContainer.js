import styled from 'styled-components';

const MainContainer = styled.div`
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;

  @media (min-width: 768px) {
    padding: 0 10%;
  }
`;

export default MainContainer;