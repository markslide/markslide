import {useState} from 'react'

export function EditPageStore() {
  const [selectedPreview, setSelectedPreview] = useState<number>(0)

  return {
    selectedPreview,
    setSelectedPreview,
  }
}
