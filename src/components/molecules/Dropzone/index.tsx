import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CloudUploadIcon } from 'components/atoms/IconButton';

/**
 * value.dataTransferがtrueならDragEventと判定
 */
const isDragEvent = (value: any): value is React.DragEvent => {
  return !!value.dataTransfer;
};

const isInput = (value: EventTarget | null): value is HTMLInputElement => {
  return value !== null;
};

/**
 * イベントから入力されたファイルを取得
 * @param e DragEvent or ChangeEvent
 * @returns Fileの配列
 */
const getFilesFromEvent = (e: React.DragEvent | React.ChangeEvent): File[] => {
  if (isDragEvent(e)) {
    return Array.from(e.dataTransfer.files);
  } else if (isInput(e.target) && e.target.files) {
    return Array.from(e.target.files);
  }

  return [];
};

type FileType =
  | 'image/png'
  | 'image/jpg'
  | 'image/jpeg'
  | 'image/gif'
  | 'video/mp4'
  | 'video/quicktime'
  | 'application/pdf';

type DropzoneRootProps = {
  width: string | number;
  height: string | number;
  hasError?: boolean;
  isFocused?: boolean;
};

// ドロップゾーンの外側の外観
const DropzoneRoot = styled.div<DropzoneRootProps>`
  border: 1px dashed
    ${({ theme, isFocused, hasError }) => {
      if (hasError) {
        return theme.colors.danger;
      } else if (isFocused) {
        return theme.colors.black;
      } else {
        return theme.colors.border;
      }
    }};
  border-radius: 8px;
  cursor: pointer;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
`;

// ドロップゾーンの内側
const DropzoneContent = styled.div<{
  width: string | number;
  height: string | number;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
`;

const DropzoneInputFile = styled.input`
  display: none;
`;

interface DropzoneProps {
  value?: File[];
  name?: string;
  acceptedFileTypes?: FileType[];
  width?: number | string;
  height?: number | string;
  hasError?: boolean;
  onDrop?: (files: File[]) => void;
  onChange?: (files: File[]) => void;
}

const Dropzone = ({
  value = [],
  name,
  acceptedFileTypes = ['image/png', 'image/jpg', 'image/gif', 'image/jpeg'],
  width = '100%',
  height = '200px',
  hasError,
  onDrop,
  onChange,
}: DropzoneProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFocused(false);

    const files = value.concat(
      getFilesFromEvent(e).filter((f) =>
        acceptedFileTypes?.includes(f.type as FileType),
      ),
    );
    onDrop && onDrop(files);
    onChange && onChange(files);
  };

  // ドラッグ時にドロップゾーン内でドロップした時
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setFocused(false);

    const files = value.concat(
      getFilesFromEvent(e).filter((f) =>
        acceptedFileTypes.includes(f.type as FileType),
      ),
    );

    if (files.length == 0) {
      return window.alert(
        `次のファイルフォーマットは指定できません ${acceptedFileTypes.join(
          ', ',
        )}`,
      );
    }

    onDrop && onDrop(files);
    onChange && onChange(files);
  };

  // ドラッグ時にドロップゾーン内に入っている時
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setFocused(false);
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setFocused(true);
  }, []);

  // ファイル選択ダイアログを表示
  const handleClick = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    if (inputRef.current && value && value.length == 0) {
      inputRef.current.value = '';
    }
  }, [value]);

  return (
    <>
      <DropzoneRoot
        ref={rootRef}
        isFocused={focused}
        hasError={hasError}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragEnter={handleDragEnter}
        onClick={handleClick}
        width={width}
        height={height}
        data-testid="dropzone"
      >
        <DropzoneInputFile
          ref={inputRef}
          type="file"
          name={name}
          accept={acceptedFileTypes.join(',')}
          onChange={handleChange}
          multiple
        />
        <DropzoneContent width={width} height={height}>
          <CloudUploadIcon size={24} />
          <span style={{ textAlign: 'center' }}>デバイスからアップロード</span>
        </DropzoneContent>
      </DropzoneRoot>
    </>
  );
};

export default Dropzone;
