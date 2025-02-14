import type React from 'react';
import styled from "styled-components";
import { FaRegCopy } from "react-icons/fa";

interface CopyButtonProps {
  onClick: () => {};
}

const Button = styled.button`
  display: flex;
  border: none;
  cursor: pointer;
  margin-left: 4px;
  padding: 4px;
  background-color: dodgerblue;
  color: white;
  border-radius: 4px;

  &:hover {
    opacity: 0.7;
  }
`;

const CopyButton: React.FC<CopyButtonProps> = ({ onClick }) => (
  <Button onClick={onClick}>
    <FaRegCopy />
  </Button>
);


export default CopyButton;