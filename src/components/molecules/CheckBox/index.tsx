import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CheckBoxIcon, CheckBoxOutlineBlankIcon } from 'components/atoms/IconButton';
import Text from 'components/atoms/Text';
import Flex from 'components/layout/Flex';

export interface CheckBoxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'defaultValue'> {
  label?: string;
}

const CheckBoxElement = styled.input`
  display: none;
`;

const Label = styled.label`
  cursor: pointer;
  margin-left: 6px;
  user-select: none;
`;

const CheckBox = ({ checked, id, label, onChange, ...rest }: CheckBoxProps) => {
  const [isChecked, setIsChecked] = useState(checked);
  const ref = useRef<HTMLInputElement>(null);
  const onClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      ref.current?.click();
      setIsChecked((isChecked) => !isChecked);
    },
    [ref, setIsChecked]
  );

  useEffect(() => {
    setIsChecked(checked ?? false);
  }, [checked]);

  return (
    <>
      <CheckBoxElement
        {...rest}
        type="checkbox"
        checked={isChecked}
        ref={ref}
        onChange={onChange}
      />
      <Flex alignItems="center">
        {checked ?? isChecked ? (
          <CheckBoxIcon onClick={onClick} />
        ) : (
          <CheckBoxOutlineBlankIcon onClick={onClick} />
        )}
        {label && label.length > 0 && (
          <Label htmlFor={id} onClick={onClick}>
            <Text>{label}</Text>
          </Label>
        )}
      </Flex>
    </>
  );
};

export default CheckBox;
