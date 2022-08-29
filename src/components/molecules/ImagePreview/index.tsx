import React from 'react'
import styled from 'styled-components'
import { CloseIcon } from 'components/atoms/IconButton'
import Text from 'components/atoms/Text'
import Flex from 'components/layout/Flex'

const CloseBox = styled(Flex)`
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  background-color: rgba(44, 44, 44, 0.66);
`

const ImageTitle = styled(Text)`
  position: absolute;
  top: 14px;
  border-radius: 6px 6px 0;
  background-color: #1d3461;
  box-sizing: border-box;
  padding-left: 4px;
  padding-right: 4px;
`

const ImagePreviewContainer = styled.div`
  position: relative;
`

interface ImagePreviewProps {
  src?: string
  alt?: string
  height?: string
  width?: string
  onRemove?: (src: string) => void
}

const ImagePreview = ({ src, alt, height, width, onRemove }: ImagePreviewProps) => {
  // 閉じるボタンを押したらonRemove
  const handleCloseClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    onRemove && src && onRemove(src)
    return false
  }

  return (
    <ImagePreviewContainer>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} height={height} width={width} />
      <CloseBox alignItems="center" justifyContent="center" onClick={handleCloseClick}>
        <CloseIcon size={24} color="white" />
      </CloseBox>
    </ImagePreviewContainer>
  )
}

export default ImagePreview
