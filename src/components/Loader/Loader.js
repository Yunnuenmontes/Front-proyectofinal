import React from 'react';
import styled from 'styled-components';
import { Modal, Spinner } from 'reactstrap';

const StyledBootstrapModal = styled(Modal)`
  transition: initial !important;
  
  .modal-content {
    transform: translate3d(0, 0, 0);
    background-color: transparent;
    border: none !important;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Loader = (props) => (
  <StyledBootstrapModal {...props}>
    <Spinner style={{ width: '100px', height: '100px' }} type="grow" color="info" />
  </StyledBootstrapModal>
);

export default Loader;