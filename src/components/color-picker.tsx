import {default as React, FC, useState} from "react";
import styled, {keyframes} from "styled-components";
import {ChromePicker} from "react-color";


interface Props {
  value?: string
  title?: string
  isOpen: boolean
  onOpen: (v: string) => void
  onChange: (v: string) => void
}

export const Color = styled.div`
  border-radius: 50%;
  width: 28px;
  height: 28px;
  background-color: ${props => props.color};
  position: relative;
  margin-bottom: 20px;
  border: 2px solid ${props => props.theme.open?'#17AE7E':'transparent'};
  
  box-shadow: #1b1f2322 2px 2px 10px;
  transition: box-shadow 0.2s;
  :hover {
    box-shadow: #1b1f2344 2px 2px 10px;
  }
  
  ::after {
    content: '${props => props.theme.title}';
    font-weight: ${props => props.theme.open?'bold':'normal'};
    color: #999;
    position: absolute;
    text-align: center;
    width: 100%;
    font-size: 12px;
    line-height: 12px;
    padding-top: 130%;
  }
`

const scaleInTop = keyframes`
  0% {
      opacity: 0;
      transform: scale(0);
      transform-origin: 50% 0;
    }
    100% {
      opacity: 1;
      transform: scale(1);
      transform-origin: 50% 0;
    }
`

const scaleOutTop = keyframes`
  0% {
      opacity: 1;
      transform: scale(1);
      transform-origin: 50% 0;
    }
    60% {
      opacity: 0;
    }
    100% {
      opacity: 0;
      transform: scale(0);
      transform-origin: 50% 0;
    }
`

const PickerContainer = styled.div`
  position: absolute;
  z-index: 2;
  margin-left: -95px;
  margin-top: 10px;
  
  &.open{
    animation: ${scaleInTop} 0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275);
    animation-fill-mode: forwards;
  }
  &.close{
    animation: ${scaleOutTop} 0.2s cubic-bezier(0.175, 0.885, 0.320, 1.275);
    animation-fill-mode: forwards;
  }
  &.closed{
    transform: scale(0);
    opacity: 0;
  }
`

const Container = styled.div`
  + div {
    margin-left: 15px;
  }
`


export const ColorPicker: FC<Props> = (props) => {

  const [color, setColor] = useState<string>(props.value || 'black')
  const [opened, setOpened] = useState<boolean>(false)

  function onColorChange(e:{[k:string]: any}) {
    setColor(e.hex)
    props.onChange && props.onChange(e.hex)
  }

  return (
    <Container>
      <Color color={color} theme={{
        title: props.title,
        open: props.isOpen
      }} onClick={()=>{props.onOpen(props.title); setOpened(true)}}/>
      <PickerContainer className={!opened? 'closed': props.isOpen ? 'open': 'close'}>
        <ChromePicker color={color} onChange={onColorChange}/>
      </PickerContainer>
    </Container>
  )
}