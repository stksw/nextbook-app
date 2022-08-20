import React from 'react';
import styled from 'styled-components';

type BadgeProps = {
  content: string;
  backgroundColor: string;
};

const BadgeWrapper = styled.div<{ backgroundColor: string }>`
  border-radius: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const BadgeText = styled.p`
  color: white;
  font-size: 11px;
  user-select: none;
`;

const Badge = ({ content, backgroundColor }: BadgeProps) => {
  return (
    <BadgeWrapper backgroundColor={backgroundColor}>
      <BadgeText>{content}</BadgeText>
    </BadgeWrapper>
  );
};

export default Badge;
