import React, { useRef, useState } from "react";
import styled from "styled-components";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";

interface UploadFileProps {
  fileType: string;
}

const Container = styled.div`
  max-width: 1024px;
  display: flex;
  margin: 0 auto;
  font-family: sans-serif;
  gap: 16px;
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
`;

const Icon = styled(FaCloudUploadAlt)`
  width: 40px;
  height: 40px;
  color: #4b5563; /* Gray-600 */
  margin-bottom: 16px;
`;

const Title = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #4b5563; /* Gray-600 */
`;

const HiddenInput = styled.input`
  display: none;
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f3f4f6; /* Gray-100 */
  padding: 16px;
  border-radius: 8px;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const FileName = styled.p`
  font-size: 0.75rem;
  color: #6b7280; /* Gray-500 */
  font-weight: 600;
  flex: 1;
`;

const CloseButton = styled.button`
  width: 12px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover svg {
    fill: #f87171; /* Red-500 */
  }
`;

const PreviewImage = styled.img`
  height: 160px;
  width: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const PreviewVideo = styled.video`
  height: 200px;
  width: 270px;
  object-fit: cover;
  border-radius: 8px;
`;

const ProgressBar = styled.div`
  background-color: #d1d5db; /* Gray-300 */
  border-radius: 9999px;
  width: 100%;
  height: 8px;
  position: relative;
  overflow: hidden;
`;

const Progress = styled.div<{ progress: number }>`
  height: 100%;
  border-radius: 9999px;
  background-color: #2563eb; /* Blue-600 */
  width: ${({ progress }) => progress}%;
`;

const ProgressLabel = styled.span<{ progress: number }>`
  position: absolute;
  left: ${({ progress }) => `calc(${progress}% - 8px)`};
  top: -8px;
  background-color: white;
  font-size: 0.75rem;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const ProgressText = styled.p`
  font-size: 0.75rem;
  color: #6b7280; /* Gray-500 */
  font-weight: 600;
  margin-top: 8px;
`;

const UploadFile: React.FC<UploadFileProps> = ({ fileType }) => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      simulateUploadProgress();
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const simulateUploadProgress = () => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  return (
    <Container>
      <UploadBox onClick={handleClick}>
        <Icon />
        <Title>Upload File</Title>
        <HiddenInput
          type="file"
          accept={fileType}
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </UploadBox>

      <div>
        {file && (
          <PreviewContainer>
            {previewUrl && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "16px",
                }}
              >
                {file?.type.startsWith("image/") ? (
                  <PreviewImage src={previewUrl} alt="Preview" />
                ) : file?.type.startsWith("video/") ? (
                  <PreviewVideo src={previewUrl} controls />
                ) : null}
              </div>
            )}
            <FileInfo>
              <FileName>
                {file.name} <span>{(file.size / 1024).toFixed(2)} kb</span>
              </FileName>
              <CloseButton onClick={() => setFile(null)}>
                <FaTimes />
              </CloseButton>
            </FileInfo>

            <ProgressBar>
              <Progress progress={progress} />
              <ProgressLabel progress={progress}>{progress}%</ProgressLabel>
            </ProgressBar>
            <ProgressText>{progress}% done</ProgressText>
          </PreviewContainer>
        )}
      </div>
    </Container>
  );
};

export default UploadFile;
