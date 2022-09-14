import styled from "styled-components";

const Button = (props) => {
  return <StyledButton {...props}></StyledButton>;
};

const StyledButton = styled.button`
  padding: ${({ padding }) => padding || "1.5rem 2rem"};
  border: none;
  background-color: ${({ primary = true, theme, disabled }) =>
    disabled ? "lightgray" : primary ? theme.color.main : "white"};
  color: ${({ disabled }) => (disabled ? "gray" : "black")};
  font-family: ${({ fontFamily, theme }) => fontFamily || theme.button.font};
  border-radius: ${(props) => props.theme.button.borderRadius};
  font-size: ${({ fontSize, theme }) => fontSize || theme.button.fontSize};
  fontweight: ${({ fontWeight }) => fontWeight || "normal"};
`;

export default Button;
