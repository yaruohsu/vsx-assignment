import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  getClassAsync,
  selectClassInfo,
} from './classroomSlice';
import QRcodeModal from './components/QRcodeModal';
import styled from "styled-components";

const FlexContainer = styled.div`
  display: flex;
  padding: 50px;
  width: calc(100vw - 50px);
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
  const classInfo = useAppSelector(selectClassInfo);

  useEffect(() => {
    dispatch(getClassAsync())
  }, []);

  return (
    <FlexContainer>
      <QRcodeModal
        {...classInfo}
        isOpen={isQRcodeModalOpen}
        onClose={async () => setIsQRcodeModalOpen(false)}
      />
    </FlexContainer>

  );

}