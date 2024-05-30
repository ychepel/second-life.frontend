import styled from "@emotion/styled";

export const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const SelectWrapper = styled.div<{ hasError: string }>`
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px 50px 12px 20px;
  background-color: white;
  border: 1px solid ${({ hasError }) => (hasError ? "red" : "white")};
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* cursor: pointer; */
  width: 100%;
`;

export const SelectLabel = styled.span`
  flex-grow: 1;
  font-family: "LibreFranklin", sans-serif;
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 16px;
  cursor: pointer;
`;

export const OptionsList = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  max-height: 280px;
  overflow-y: auto;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 10;
`;

export const OptionItem = styled.li`
  padding: 20px 10px 10px 20px;
  font-family: "LibreFranklin", sans-serif;

  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
