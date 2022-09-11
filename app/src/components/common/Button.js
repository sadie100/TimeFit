import styled from "styled-components";

const Button = (props) => {
  return <StyledButton {...props}></StyledButton>;
};

const StyledButton = styled.button`
  padding: 1.5rem 2rem;
  border: none;
  background-color: white;
  font-family: ${(props) => props.theme.button.font};
  border-radius: ${(props) => props.theme.button.borderRadius};
  font-size: ${(props) => props.theme.button.fontSize};
`;

export default Button;
