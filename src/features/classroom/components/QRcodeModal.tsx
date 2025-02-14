import type React from "react";
import { QRCodeCanvas } from "qrcode.react";
import styled from "styled-components";
import { FaChevronLeft } from "react-icons/fa";
import Modal from "./Modal";
import CopyButton from "./CopyButton";
import packageJson from "../../../../package.json";

interface QRcodeModalProps {
  name: string;
  link: string;
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  gap: 12px;
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const RowContainer = styled.div`
  display: flex;
  gap: 40px;
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const QRCodeContainer = styled.div`
  display: flex;
  align-self: center;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 280px;
  width: 280px;
`;

const Button = styled.button`
  display: flex;
  padding: 0;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
  gap: 2px;
  
  &:hover {
    opacity: 0.7;
  }
`;

const VersionText = styled.span`
  display: flex;
  justify-content: center;
  font-size: 10px;
`;


const QRcodeModal: React.FC<QRcodeModalProps> = ({
  name,
  link,
  id,
  isOpen,
  onClose,
}) => {
  const handleCopy = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(`Copy ${fieldName} successful !`)
    } catch (err) {
      alert(`Copy ${fieldName} failed. Please check the error message in the console.`)
      console.error('copy failed:', err);
    }
  };

  return (
    <Modal
      width={360}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Content>
        <Button onClick={onClose}>
          <FaChevronLeft />
          Back to Class List
        </Button>
        <Title>Join {name}</Title>
        <RowContainer>
          <Field>
            ID: {id}
            <CopyButton onClick={() => handleCopy(id, 'ID')} />
          </Field>
          <Field>
            Link
            <CopyButton onClick={() => handleCopy(link, 'Link')} />
          </Field>
        </RowContainer>
        <QRCodeContainer>
          <QRCodeCanvas
            value={link}
            style={{
              height: 250,
              width: 250,
              marginTop: 8,
            }}
          />
        </QRCodeContainer>
        <VersionText>Version {packageJson.version}</VersionText>
      </Content>
    </Modal>
  )
};

export default QRcodeModal;