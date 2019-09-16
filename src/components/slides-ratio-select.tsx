import {default as React, FC, useState} from "react";
import styled from "styled-components";

interface Props {
  value?: string
  onChange?: (v: string) => void
}

const RatioButton = styled.button`
  + button {
    margin-left: 20px;
  }
  
  font-size: 12px;
  font-weight: lighter;
  color: #666;
  
  background-color: #ffffff;
  border-radius: 4px;
  padding: 6px 10px;
  border: solid 2px transparent;
  
  box-shadow: #1b1f2322 2px 2px 10px;
  :hover {
    box-shadow: #1b1f2344 2px 2px 10px;
  }
  
  &.active {
    border: solid 2px #17AE7E;
  }
`

export const SlidesRatioPicker: FC<Props> = (props) => {

  const [ratio, setRatio] = useState(props.value || 'r43');

  function onRadioClick(e: any) {
    let newRatio = e.target.name
    setRatio(newRatio)
    props.onChange && props.onChange(newRatio)
  }

  return (
    <>
      <RatioButton name='r43' className={ratio === 'r43' && 'active'} onClick={onRadioClick}>4 : 3</RatioButton>
      <RatioButton name='r169' className={ratio === 'r169' && 'active'} onClick={onRadioClick}>16 : 9</RatioButton>
    </>
  )
}
