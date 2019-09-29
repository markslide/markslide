import {FC} from 'react'
import * as React from 'react'
import {Upload} from '@/components/upload'
import {RouteComponentProps} from 'react-router'
import {useStore} from 'reto'
import {SlideStore} from '@/stores/slide.store'

export const UploadPage: FC<RouteComponentProps> = (props) => {
  const store = useStore(SlideStore)

  return (
    <div>
      <Upload onUpload={(text) => {
        store.setText(text)
        props.history.push('/presentation')
      }}/>
    </div>
  )
}
