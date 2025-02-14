import type React from 'react';
import styled from 'styled-components';
import { FaTimes } from "react-icons/fa";

const ModalContainer = styled.div<{ $width?: number; }> `
  position: relative;  
  top: 10%;
  background: #eee;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: ${props => props.$width ? props.$width : '100%'};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
  
  &:hover {
    opacity: 0.7;
  }
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  width
}) => {
  if (!isOpen) return null;

  return (
    <ModalContainer $width={width}>
      <CloseButton onClick={onClose}>
        <FaTimes />
      </CloseButton>
      {children}
    </ModalContainer>

  );
};

export default Modal;