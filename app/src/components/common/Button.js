import styled from "styled-components";

const Button = (props) => {
  return <StyledButton {...props}></StyledButton>;
};

const StyledButton = styled.button`
  padding: ${({ padding }) => (padding ? padding : "1.5rem 2rem")};
  border: none;
  background-color: ${({ primary = true, theme }) =>
    primary ? theme.color.main : "white"};
  color: black;
  font-family: ${(props) => props.theme.button.font};
  border-radius: ${(props) => props.theme.button.borderRadius};
  font-size: ${({ fontSize, theme }) =>
    fontSize ? fontSize : theme.button.fontSize};
`;

export default Button;
