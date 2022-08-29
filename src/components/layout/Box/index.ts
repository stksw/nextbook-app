import styled from 'styled-components'
import { Responsive } from 'types'
import { Color, Space, toPropValue } from 'utils/styles'

// Boxが取りうるプロパティ
export type BoxProps = {
  color?: Responsive<Color>
  backgroundColor?: Responsive<Color>
  width?: Responsive<string>
  height?: Responsive<string>
  minWidth?: Responsive<string>
  minHeight?: Responsive<string>
  display?: Responsive<string>
  border?: Responsive<string>
  overflow?: Responsive<string>
  margin?: Responsive<Space>
  marginTop?: Responsive<Space>
  marginLeft?: Responsive<Space>
  marginRight?: Responsive<Space>
  marginBottom?: Responsive<Space>
  padding?: Responsive<Space>
  paddingTop?: Responsive<Space>
  paddingLeft?: Responsive<Space>
  paddingRight?: Responsive<Space>
  paddingBottom?: Responsive<Space>
}

const Box = styled.div<BoxProps>`
  ${(props) => toPropValue('color', props.color, props.theme)}
  ${(props) => toPropValue('background-color', props.backgroundColor, props.theme)}
  ${(props) => toPropValue('width', props.width, props.theme)}
  ${(props) => toPropValue('height', props.height, props.theme)}
  ${(props) => toPropValue('minWidth', props.minWidth, props.theme)}
  ${(props) => toPropValue('minHeight', props.minHeight, props.theme)}
  ${(props) => toPropValue('display', props.display, props.theme)}
  ${(props) => toPropValue('overflow', props.overflow, props.theme)}
  ${(props) => toPropValue('border', props.border, props.theme)}
  ${(props) => toPropValue('margin', props.margin, props.theme)}
  ${(props) => toPropValue('margin-top', props.marginTop, props.theme)}
  ${(props) => toPropValue('margin-left', props.marginLeft, props.theme)}
  ${(props) => toPropValue('margin-right', props.marginRight, props.theme)}
  ${(props) => toPropValue('margin-bottom', props.marginBottom, props.theme)}
  ${(props) => toPropValue('padding', props.margin, props.theme)}
  ${(props) => toPropValue('padding-top', props.marginTop, props.theme)}
  ${(props) => toPropValue('padding-left', props.marginLeft, props.theme)}
  ${(props) => toPropValue('padding-right', props.marginRight, props.theme)}
  ${(props) => toPropValue('padding-bottom', props.marginBottom, props.theme)}
`

export default Box
