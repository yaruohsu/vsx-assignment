import type React from "react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import styled from "styled-components";
import { FaEllipsisV } from "react-icons/fa";

import Modal from "./Modal";

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
  background: ${props => props.$active ? 'white' : '#d0d0d0'};
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



interface ClassroomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ClassroomModal: React.FC<ClassroomModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState(activeTabStatus.studentList);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <Content>
        <Header>
          <h2>302 Science</h2>
          <FaUser />
          <span>16/30</span>
        </Header>
        <TabPanel>
          <TabContainer>
            <Tab
              $active={activeTab === activeTabStatus.studentList}
              onClick={() => setActiveTab(activeTabStatus.studentList)}
            >
              Student List
            </Tab>
            <Tab
              $active={activeTab === activeTabStatus.group}
              onClick={() => setActiveTab(activeTabStatus.group)}
            >
              Group
            </Tab>
          </TabContainer>
          <MoreButton> <FaEllipsisV /></MoreButton>
        </TabPanel>

        <Card>
          {activeTab === activeTabStatus.studentList && 'studentList'}
          {activeTab === activeTabStatus.group && 'group'}
        </Card>
      </Content>
    </Modal >
  );
};

export default ClassroomModal;