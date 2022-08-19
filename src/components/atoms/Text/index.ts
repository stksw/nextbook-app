import styled from 'styled-components';
import { Responsive } from 'types/styles';
import { Color, FontSize, LetterSpacing, LineHeight, toPropValue } from 'utils/styles';

export type TextVariant = 'extraSmall' | 'small' | 'medium' | 'mediumLarge' | 'large' | 'extraLarge';

export type TextProps = {
  variant?: TextVariant;
  fontSize?: Responsive<FontSize>;
  fontWeight?: Responsive<string>;
  letterSpacing?: Responsive<LetterSpacing>;
  lineHeight?: Responsive<LineHeight>;
  textAlign?: Responsive<string>;
  color?: Responsive<Color>;
  backgroundColor?: Responsive<Color>;
  width?: Responsive<string>;
  height?: Responsive<string>;
  minWidth?: Responsive<string>;
  minHeight?: Responsive<string>;
  display?: Responsive<string>;
  border?: Responsive<string>;
  order?: Responsive<string>;
  margin?: Responsive<string>;
  marginTop?: Responsive<string>;
  marginLeft?: Responsive<string>;
  marginRight?: Responsive<string>;
  marginBottom?: Responsive<string>;
  padding?: Responsive<string>;
  paddingTop?: Responsive<string>;
  paddingLeft?: Responsive<string>;
  paddingRight?: Responsive<string>;
  paddingBottom?: Responsive<string>;
};

const variants = {
  extraSmall: {
    fontSize: 'extraSmall',
    letterSpacing: 0,
    lineHeight: 0,
  },
  small: {
    fontSize: 'small',
    letterSpacing: 1,
    lineHeight: 1,
  },
  medium: {
    fontSize: 'medium',
    letterSpacing: 2,
    lineHeight: 2,
  },
  mediumLarge: {
    fontSize: 'mediumLarge',
    letterSpacing: 3,
    lineHeight: 3,
  },
  large: {
    fontSize: 'large',
    letterSpacing: 4,
    lineHeight: 4,
  },
  extraLarge: {
    fontSize: 'extraLarge',
    letterSpacing: 5,
    lineHeight: 5,
  },
};

const Text = styled.span<TextProps>`
  ${({ variant, fontSize, letterSpacing, lineHeight, theme }) => {
    if (variant && variants[variant]) {
      const styles = [];
      !fontSize && styles.push(toPropValue('font-size', variants[variant].fontSize, theme));
      !letterSpacing && styles.push(toPropValue('letter-spacing', variants[variant].letterSpacing, theme));
      !lineHeight && styles.push(toPropValue('line-height', variants[variant].lineHeight, theme));

      return styles.join('\n');
    }
  }}

  ${(props) => toPropValue('color', props.color, props.theme)}
  ${(props) => toPropValue('background-color', props.backgroundColor, props.theme)}
`;

export default Text;
