import {default as React, FC} from 'react'
import styled from 'styled-components'
import {clickable} from '@/utils/clickable'
import {useStore} from 'reto'
import {SlideStore} from '@/stores/slide.store'
import {Ratio} from '@/classes/ratio'

interface Props {
  value?: string
  onChange?: (v: string) => void
}

const RatioButton = styled.button<{
  active: boolean
}>`
  ${clickable};
  + button {
    margin-left: 20px;
  }
  
  font-size: 12px;
  font-weight: lighter;
  color: #666;
  
  background-color: #ffffff;
  border-radius: 4px;
  padding: 6px 10px;
  border: solid 2px ${props => props.active ? '#17AE7E' : 'transparent'};
  
  box-shadow: #1b1f2322 2px 2px 10px;
  transition: box-shadow 0.2s;
  :hover {
    box-shadow: #1b1f2344 2px 2px 10px;
  }
`

export const SlidesRatioPicker: FC<Props> = (props) => {
  const slideStore = useStore(SlideStore)

  function handleClick(val: Ratio) {
    return function() {
      slideStore.setRatio(val)
    }
  }

  return (
    <>
      <RatioButton active={slideStore.ratio === Ratio['4:3']} onClick={handleClick(Ratio['4:3'])}>4 : 3</RatioButton>
      <RatioButton active={slideStore.ratio === Ratio['16:9']} onClick={handleClick(Ratio['16:9'])}>16 : 9</RatioButton>
    </>
  )
}
