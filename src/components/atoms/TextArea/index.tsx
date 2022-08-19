import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minRows?: number;
  maxRows?: number;
  hasError?: boolean;
}

const StyledTextArea = styled.textarea<{ hasError?: boolean; hasBorder?: boolean }>`
  color: ${({ theme }) => theme.colors.inputText};
  border: 1px solid
    ${({ theme, hasError }) => (hasError ? theme.colors.danger : theme.colors.border)};
  border-radius: 5px;
  box-sizing: border-box;
  outline: none;
  width: 100%;
  height: auto;
  font-size: 16px;
  line-height: 24px;
  resize: none;
  overflow: auto;
  padding: 9px 12px 10px 12px;
  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }
`;

const TextArea = (props: TextAreaProps) => {
  const { rows = 5, minRows = 5, maxRows = 10, hasError, onChange, children, ...rest } = props;
  const [textareaRows, setTextareaRows] = useState(Math.min(rows, minRows));

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const textareaLineHeight = 24;
      const previousRows = e.target.rows;
      e.target.rows = minRows; // 行数のリセット

      const currentRows = Math.floor(e.target.scrollHeight / textareaLineHeight);

      if (currentRows === previousRows) {
        e.target.rows = currentRows;
      }

      if (currentRows >= maxRows) {
        e.target.rows = maxRows;
        e.target.scrollTop = e.target.scrollHeight; // 入力した行の高さ
      }

      // 最大行数を超えないように行数をセット
      setTextareaRows(currentRows < maxRows ? currentRows : maxRows);
      onChange && onChange(e);
    },
    [minRows, maxRows, onChange]
  );

  return (
    <StyledTextArea
      hasError={hasError}
      onChange={handleChange}
      aria-label={rest.placeholder}
      rows={textareaRows}
    >
      {children}
    </StyledTextArea>
  );
};

TextArea.defaultProps = {
  rows: 5,
  minRows: 5,
  maxRows: 10,
};

export default TextArea;
