import type React from "react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import styled from "styled-components";
import { FaEllipsisV } from "react-icons/fa";

import Modal from "./Modal";
import type { Student } from "../classroomSlice";
import StudentCard from "./StudentCard";


interface ClassroomModalProps {
  classroomName: string;
  classroomLimit: number;
  students: Student[],
  studentGroups: Student[][],
  isOpen: boolean;
  onClose: () => void;
  onMinusScoreClick: (studentId: number | null) => void;
  onPlusScoreClick: (studentId: number | null) => void;
}

enum activeTabStatus {
  studentList = 0,
  group = 1,
}


const Content = styled.div`
  min-width: 300px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 30px;
  border-radius: 8px 8px 0 0;
  font-weight: 600;
`;

const TabPanel = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border: none;
  background: ${props => props.$active ? 'white' : props.theme.disabled};
  color: ${props => props.$active ? 'dodgerblue' : '#333'};
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  font-weight: 600;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
  height: 310px;
  padding: 20px 30px;
  overflow-y: scroll;
  scroll-behavior: smooth;
`;

const MoreButton = styled.button`
  display: flex;
  border: none;
  background-color: unset;
  cursor: pointer;
  padding: 4px;
  color: #333;
  border-radius: 4px;

  &:hover {
    opacity: 0.7;
  }
`;

const StudentsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Group = styled.div`
  display: flex;
  gap: 8px;
`;

const ClassroomModal: React.FC<ClassroomModalProps> = ({
  classroomName,
  classroomLimit,
  students,
  studentGroups,
  isOpen,
  onClose,
  onMinusScoreClick,
  onPlusScoreClick,
}) => {
  const [activeTab, setActiveTab] = useState(activeTabStatus.studentList);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <Content>
        <Header>
          <h2>{classroomName}</h2>
          <FaUser />
          <span>{students.length}/{classroomLimit}</span>
        </Header>
        <TabPanel>
          <TabContainer>
            <Tab
              $active={activeTab === activeTabStatus.studentList}
              onClick={() => setActiveTab(activeTabStatus.studentList)}
            >
              Students
            </Tab>
            <Tab
              $active={activeTab === activeTabStatus.group}
              onClick={() => setActiveTab(activeTabStatus.group)}
            >
              Group
            </Tab>
          </TabContainer>
          <MoreButton>
            <FaEllipsisV />
          </MoreButton>
        </TabPanel>

        <Card>
          {activeTab === activeTabStatus.studentList && (
            <StudentsContainer>
              {students.map((student, index) =>
                <StudentCard
                  key={`${index}${student.id}${student.name}`}
                  number={index + 1}
                  student={student}
                  onMinusClick={() => onMinusScoreClick(student.id)}
                  onPlusClick={() => onPlusScoreClick(student.id)}
                />)}
            </StudentsContainer>
          )}
          {activeTab === activeTabStatus.group && (
            <GroupContainer>
              {studentGroups.map((group, groupIndex) => (
                <Group key={groupIndex}>
                  <h3>Group {groupIndex + 1}</h3>
                  {group.map((student, studentIndex) => (
                    <StudentCard
                      key={`${studentIndex}${student.id}${student.name}`}
                      number={studentIndex + 1}
                      student={student}
                      onMinusClick={() => onMinusScoreClick(student.id)}
                      onPlusClick={() => onPlusScoreClick(student.id)}
                    />
                  ))}
                </Group>
              ))}
            </GroupContainer>
          )}
        </Card>
      </Content>
    </Modal >
  );
};

export default ClassroomModal;