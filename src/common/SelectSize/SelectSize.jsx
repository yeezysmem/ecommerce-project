import React, { useState } from "react";
import styled from "styled-components";

const SizeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0;
`;

const SizeButton = styled.button`
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: ${(props) => (props.selected ? "#D0FD11" : "#fff")};
  color: ${(props) => (props.selected ? "#000" : "#333")};
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  transition: 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const SizeLabel = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SizeDescription = styled.p`
  font-size:14px;
  font-weight:light;
  margin-top:5px;
`

const SelectSize = ({ sizes, onSizeSelect }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    if (onSizeSelect) {
      onSizeSelect(size); // Pass selected size to parent component
    }
  };

  return (
    <div>
      <SizeLabel>Select the size:</SizeLabel>
      <SizeDescription>Large size: we advise you to order a half size below</SizeDescription>
      <SizeContainer>
        {sizes.map((size, index) => (
          <SizeButton
            key={index}
            selected={size === selectedSize}
            onClick={() => handleSizeClick(size)}
          >
            {size}
          </SizeButton>
        ))}
      </SizeContainer>
    </div>
  );
};

export default SelectSize;
