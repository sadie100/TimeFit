import styled from "styled-components";

export const StyledForm = styled.form`
  width: ${({ theme }) => theme.form.width};
  max-width: ${({ theme }) => theme.form.maxWidth};
  padding: 30px;
  display: flex;
  flex-direction: column;
  //align-items: center;
  gap: 10px;
  * {
    font-family: Noto Sans KR;
  }
`;
export const Label = styled.span`
  color: gray;
  font-size: 14px;
  font-family: Noto Sans KR;
  flex: 1 0 auto;
`;
export const Line = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;
export const StyledInput = styled.input`
  border: ${({ disabled }) => (disabled ? "none" : `1px solid lightgray`)};
  border-radius: 10px;
  padding: ${({ padding, theme }) => padding || theme.form.padding};
  color: black;
  font-family: Noto Sans KR;
  flex: 1 2 auto;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: lightgray;
  }
  :-ms-input-placeholder {
    color: lightgray;
  }
  width: ${({ width }) => width};
  max-width: ${({ maxWidth }) => maxWidth};
  font-size: ${({ fontSize }) => fontSize};
  //${({ css }) => css}
`;

export const ErrorBorderInput = styled.input`
  border: 1px solid ${({ error }) => (error ? "red" : "lightgray")};
  border-radius: 10px;
  padding: ${({ theme }) => theme.form.padding};
  color: black;
  font-family: Noto Sans KR;
  flex: 1 2 auto;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: lightgray;
  }
  :-ms-input-placeholder {
    color: lightgray;
  }
  width: ${({ width }) => width};
`;
export const ErrorDiv = styled.div`
  border: none;
  color: red;
  font-family: Noto Sans KR;
  font-size: 13px;
`;
export const LineContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  * {
    flex-grow: 1;
  }
`;
export const StyledSelect = styled.select`
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: ${({ theme }) => theme.form.padding};
  color: black;
  width: 100%;
  font-family: Noto Sans KR;
  flex: 1 2 auto;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: lightgray;
  }
  :-ms-input-placeholder {
    color: lightgray;
  }
`;
