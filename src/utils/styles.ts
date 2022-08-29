/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { theme } from 'themes'
import { Responsive, ResponsiveProp } from 'types'

type AppTheme = typeof theme
type SpaceThemeKeys = keyof typeof theme.space
type ColorThemeKeys = keyof typeof theme.colors
type FontSizeThemeKeys = keyof typeof theme.fontSizes
type LetterSpacingThemeKeys = keyof typeof theme.letterSpacings
type LineHeightThemeKeys = keyof typeof theme.lineHeights

export type Space = SpaceThemeKeys | (string & {})
export type Color = ColorThemeKeys | (string & {})
export type FontSize = FontSizeThemeKeys | (string & {})
export type LetterSpacing = LetterSpacingThemeKeys | (string & {})
export type LineHeight = LineHeightThemeKeys | (string & {})

const BREAKPOINTS: { [key: string]: string } = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
}

/**
 * Responsive型をCSSプロパティとその値に変換
 * @param propKey CSSプロパティ
 * @param prop Responsive型
 * @param theme AppTheme
 * @returns CSSプロパティとその値 (ex. background-color: white;)
 */
export function toPropValue<T>(propKey: string, prop?: Responsive<T>, theme?: AppTheme) {
  if (prop === undefined) return undefined

  if (isResponsivePropType(prop)) {
    const result = []
    for (const responsiveKey in prop) {
      if (responsiveKey === 'base') {
        result.push(`${propKey}: ${toThemeValueIfNeeded(propKey, prop, theme)}`)
      } else if (
        responsiveKey === 'sm' ||
        responsiveKey == 'md' ||
        responsiveKey == 'lg' ||
        responsiveKey == 'xl'
      ) {
        const breakpoint = BREAKPOINTS[responsiveKey]
        const style = `${propKey}: ${toThemeValueIfNeeded(propKey, prop[responsiveKey], theme)}`
        result.push(`@media screen and (min-width: ${breakpoint}) {${style}}`)
      }
    }
    return result.join('\n')
  }
  return `${propKey}: ${toThemeValueIfNeeded(propKey, prop, theme)}`
}

function isResponsivePropType<T>(prop: any): prop is ResponsiveProp<T> {
  return (
    prop &&
    (prop.base !== undefined ||
      prop.sm !== undefined ||
      prop.md !== undefined ||
      prop.lg !== undefined ||
      prop.xl !== undefined)
  )
}

const SPACE_KEYS = new Set([
  'margin',
  'margin-top',
  'margin-left',
  'margin-right',
  'margin-bottom',
  'padding',
  'padding-top',
  'padding-left',
  'padding-right',
  'padding-bottom',
])
const COLOR_KEYS = new Set(['color', 'background-color'])
const FONT_SIZE_KEYS = new Set(['font-size'])
const LETTER_SPACING_KEYS = new Set(['letter-spacing'])
const LINE_HEIGHT_KEYS = new Set(['line-height'])

/**
 * Themeに指定されたCSSプロパティの値に変換
 * @param propKey CSSプロパティ
 * @param value CSSプロパティの値
 * @param theme AppTheme
 * @returns CSSプロパティの値
 */
function toThemeValueIfNeeded<T>(propKey: string, value: T, theme?: AppTheme) {
  if (!theme) return value

  if (theme.space && SPACE_KEYS.has(propKey) && isSpaceThemeKeys(value, theme)) {
    return theme.space[value]
  } else if (theme.colors && COLOR_KEYS.has(propKey) && isColorThemeKeys(value, theme)) {
    return theme.colors[value]
  } else if (theme.fontSizes && FONT_SIZE_KEYS.has(propKey) && isFontSizeThemeKeys(value, theme)) {
    return theme.fontSizes[value]
  } else if (
    theme.letterSpacings &&
    LETTER_SPACING_KEYS.has(propKey) &&
    isLetterSpacingKeys(value, theme)
  ) {
    return theme.letterSpacings[value]
  } else if (theme.lineHeights && LINE_HEIGHT_KEYS.has(propKey) && isLineHeightKeys(value, theme)) {
    return theme.lineHeights[value]
  }

  return value
}

function isSpaceThemeKeys(prop: any, theme: AppTheme): prop is SpaceThemeKeys {
  return Object.keys(theme.space).filter((key) => key == prop).length > 0
}

function isColorThemeKeys(prop: any, theme: AppTheme): prop is ColorThemeKeys {
  return Object.keys(theme.colors).filter((key) => key == prop).length > 0
}

function isFontSizeThemeKeys(prop: any, theme: AppTheme): prop is FontSizeThemeKeys {
  return Object.keys(theme.fontSizes).filter((key) => key == prop).length > 0
}

function isLetterSpacingKeys(prop: any, theme: AppTheme): prop is LetterSpacingThemeKeys {
  return Object.keys(theme.letterSpacings).filter((key) => key == prop).length > 0
}

function isLineHeightKeys(prop: any, theme: AppTheme): prop is LineHeightThemeKeys {
  return Object.keys(theme.lineHeights).filter((key) => key == prop).length > 0
}
