import React, { useRef, useState } from "react";
import styled from "styled-components";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";

interface UploadFileProps {
  fileType: string;
  maxFiles?: number;
  onFilesChange: (files: File[]) => void;
}

const Container = styled.div`
  max-width: 1024px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  font-family: sans-serif;
`;

const UploadBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  min-height: 200px;
  min-width: 200px;
  padding: 16px;
  border: 2px dashed black;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const Icon = styled(FaCloudUploadAlt)`
  width: 40px;
  height: 40px;
  color: #4b5563;
  margin-bottom: 16px;
`;

const Title = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #4b5563;
`;

const HiddenInput = styled.input`
  display: none;
`;

const PreviewContainer = styled.div<{ itemCount: number }>`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => (props.itemCount === 1 ? 1 : Math.min(4, props.itemCount))},
    minmax(200px, 1fr)
  );
  gap: 16px;
  margin-top: 16px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: white;
  border: none;
  border-radius: 50%;
  padding: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover svg {
    color: #f87171;
  }
`;

const UploadFile: React.FC<UploadFileProps> = ({ fileType, maxFiles = 6, onFilesChange }) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (files.length + selectedFiles.length > maxFiles) {
      alert(`You can upload a maximum of ${maxFiles} files.`);
      return;
    }
    const newFiles = [...files, ...selectedFiles];
    setFiles(newFiles);
    onFilesChange(newFiles); // Call the callback with the new files array
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeFile = (fileToRemove: File) => {
    const updatedFiles = files.filter((file) => file !== fileToRemove);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles); // Update parent with the remaining files
  };

  return (
    <Container>
      {files.length < maxFiles && (
        <UploadBox onClick={handleClick}>
          <Icon />
          <Title>Upload Files</Title>
          <HiddenInput
            type="file"
            accept={fileType}
            multiple
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </UploadBox>
      )}

      <PreviewContainer itemCount={files.length}>
        {files.map((file, index) => (
          <ImageWrapper key={index}>
            <PreviewImage src={URL.createObjectURL(file)} alt={`Preview ${index + 1}`} />
            <CloseButton onClick={() => removeFile(file)}>
              <FaTimes />
            </CloseButton>
          </ImageWrapper>
        ))}
      </PreviewContainer>
    </Container>
  );
};

export default UploadFile;
