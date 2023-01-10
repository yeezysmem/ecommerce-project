import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #000;
  border-radius: 8px;
  padding: 15px 0;
  width: 100%;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const ButtonText = styled.span`
  color: #fff;
  font-size: 19px;
  font-family: "MontserratSemiBold";
`;

const SumbitButton = ({buttonText}) => {
    return (
        <StyledButton type="sumbit">
            <ButtonText>{buttonText}</ButtonText>
        </StyledButton>
    );
};

export default SumbitButton;
