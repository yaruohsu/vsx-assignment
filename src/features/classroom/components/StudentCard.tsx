import type React from 'react';
import styled from "styled-components";

import type { Student } from '../classroomSlice';

const DECREASE_COLOR = '#4CAF50';
const INCREASE_COLOR = '#ff4444';

interface StudentCardProps {
  number: number;
  student: Student;
  onMinusClick: () => void;
  onPlusClick: () => void;
}


const Title = styled.div`
  padding: 2px;
  color: white;
  text-align: center;
  font-size: 12px;
  border-radius: 4px 4px 0 0;
`;

const StudentName = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
  font-size: 14px;
`;


const Container = styled.div<{ $disabled: boolean }>`
  display: flex;
  flex-direction: column;
  width: 120px;
  height: 120px;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.$disabled ? props.theme.disabled : 'dodgerblue'};
  font-weight: 600;

  ${Title} {
    background-color:  ${props => props.$disabled ? props.theme.disabled : 'dodgerblue'};
  }

  ${StudentName} {
    color: ${props => props.$disabled ? props.theme.disabled : '#333'};
  }

  ${ActionContainer} {
    border-top: 1px solid  ${props => props.$disabled ? props.theme.disabled : 'dodgerblue'};
    span {
      color: ${props => props.$disabled ? props.theme.disabled : '#333'};
    }
  } 
`;

const Button = styled.button<{ $backgroundColor: string; $disabled: boolean }>`
  display: flex;
  padding: 4px 8px;
  align-items: center;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  background: ${props => props.$disabled ? props.theme.disabled : props.$backgroundColor};
  border: none;
  gap: 2px;
  color: white;
  border-radius: 4px;
  
  &:hover {
    opacity: 0.7;
  }
`;


const StudentCard: React.FC<StudentCardProps> = ({ number, student, onMinusClick, onPlusClick }) => {
  const disabled = student.id === null;

  return (
    <Container $disabled={disabled}>
      <Title>{String(number).padStart(2, "0")}</Title>
      <StudentName>{student.name.split(" ")[0]}</StudentName>
      <ActionContainer>
        <Button
          $disabled={disabled}
          $backgroundColor={DECREASE_COLOR}
          onClick={onMinusClick}
        >
          -1
        </Button>
        <span>{student.score}</span>
        <Button
          $disabled={disabled}
          $backgroundColor={INCREASE_COLOR}
          onClick={onPlusClick}
        >
          +1
        </Button>
      </ActionContainer>
    </Container>
  );
};

export default StudentCard;