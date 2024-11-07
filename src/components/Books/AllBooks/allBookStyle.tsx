// sharedTableStyles.tsx
import styled, { keyframes } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f2f5;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 900px;
  background-color: #fff;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 10px;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
`;

export const StyledInput = styled.input`
  flex: 1;
  min-width: 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
  color: black;
  background:#F9FAFB;
  text-align: left;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const TableContainer = styled.div`
  min-height: 500px;
  max-height: 500px;
  overflow-y: auto;
  overflow-x: auto;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  position: relative;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ffaa17;
    border-radius: 10px;
    border: 2px solid #f1f1f1;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #f59e0b;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1em;
  color: #374151;
  text-align: left;
`;

export const StyledTableCell = styled.td`
  padding: 12px;
  max-width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  border-bottom: 1px solid #d3d3d3;
`;

export const StyledTableRow = styled.tr`
  cursor: pointer;
  transition: background-color 0.3s;

  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #e2e8f0;
  }
`;

export const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #f59e0b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  text-transform: uppercase;

  &:hover {
    background-color: #d97706;
  }
`;

export const StyledTableHeader = styled.th`
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f9fafb;
  color: #4b5563;
  text-transform: uppercase;
  font-size: 0.75rem;
  position: sticky;
  top: 0;
  z-index: 10;
  cursor: pointer;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #f59e0b;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto;
`;

export const StyledImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
`;