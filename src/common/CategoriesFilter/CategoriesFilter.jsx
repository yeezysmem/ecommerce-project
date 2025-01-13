import React from "react";
import { Button, ButtonGroup } from "@mui/material";
import styled from "styled-components";

const StyledButton = styled.button`
    background-color: black;
    color: white;
    border: 1px solid white;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
        background-color: white;
        color: black;
    }

    &:active {
        background-color: gray;
    }
`;

const ButtonGroupWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    // height: 100vh;
`;

const CategoriesFilter = ({ categories, onSelectCategory }) => {
    return (
        <ButtonGroupWrapper>
            {categories.map((category) => (
                <StyledButton
                    key={category}
                    onClick={() => onSelectCategory(category)}
                >
                    {category}
                </StyledButton>
            ))}
        </ButtonGroupWrapper>
    );
};

export default CategoriesFilter;
