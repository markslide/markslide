import {FC} from 'react'
import * as React from 'react'
import {Upload} from '@/components/upload'
import {RouteComponentProps} from 'react-router'
import {useStore} from 'reto'
import {PresentationStore} from '@/stores/presentation.store'

export const UploadPage: FC<RouteComponentProps> = (props) => {
  const store = useStore(PresentationStore)
  
  return (
    <div>
      <Upload onUpload={(text) => {
        store.setText(text)
        props.history.push('/presentation')
      }}/>
    </div>
  )
}
