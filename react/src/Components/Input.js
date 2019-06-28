import styled from "styled-components";

const Input = styled.input`
  width: 20rem;
  border: 0.1rem solid gray;
  display: block;
  padding: 1.4rem;
  margin: 1rem auto;
  border-radius: 0.4rem;
  font-size: 1.8rem;

  ::placeholder {
    color: teal;
  }

  :focus {
    outline: red;
  }
`;

export default Input;
