import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  getClassAsync,
  selectClassInfo,
  selectStudents,
  increaseScore,
  decreaseScore,
} from './classroomSlice';
import QRcodeModal from './components/QRcodeModal';
import ClassroomModal from "./components/ClassroomModal";

const FlexContainer = styled.div`
  display: flex;
  padding: 50px;
  width: calc(100vw - 100px);
  justify-content: center;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px 16px;
    width: calc(100vw - 32px);
  }
`;

export const Classroom = () => {
  const dispatch = useAppDispatch();
  const [isQRcodeModalOpen, setIsQRcodeModalOpen] = useState(true);
  const [isClassroomModalOpen, setIsClassroomModalOpen] = useState(true);
  const classInfo = useAppSelector(selectClassInfo);
  const students = useAppSelector(selectStudents);

  useEffect(() => {
    dispatch(getClassAsync())
  }, []);

  const handleMinusScore = (studentId: number | null) => {
    if (studentId !== null) {
      dispatch(decreaseScore(studentId));
    }

  };

  const handlePlusScore = (studentId: number | null) => {
    if (studentId !== null) {
      dispatch(increaseScore(studentId));
    }
  };



  return (
    <FlexContainer>
      <QRcodeModal
        {...classInfo}
        isOpen={isQRcodeModalOpen}
        onClose={async () => setIsQRcodeModalOpen(false)}
      />
      <ClassroomModal
        isOpen={isClassroomModalOpen}
        classroomName={classInfo.name}
        classroomLimit={classInfo.limit}
        students={students}
        onClose={() => setIsClassroomModalOpen(false)}
        onPlusScoreClick={handlePlusScore}
        onMinusScoreClick={handleMinusScore}
      />
    </FlexContainer>

  );

}