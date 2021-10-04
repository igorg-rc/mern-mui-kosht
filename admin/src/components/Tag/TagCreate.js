import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { create_tag } from '../../api/api'
import { SimpleForm } from '../UI/SimpleForm'
import { PageTitle } from '../UI/PageTitle'

export const TagCreate = () => {
  const [loading, setLoading] = useState(false)
  const [titleUa, setTitleUa] = useState("")
  const [titleEn, setTitleEn] = useState("")
  const history = useHistory()

  const onTagCreate = async event => {
    event.preventDefault()
    await create_tag({title_ua: titleUa, title_en: titleEn})
    history.push('/tags')
  }

  return loading ? <div>Loading...</div> : <>
    <PageTitle text="Create new tag" />
    <SimpleForm 
      onTitleOneInputChange={e => setTitleUa(e.target.value)}
      onTitleTwoInputChange={e => setTitleEn(e.target.value)}
      onFormSubmit={onTagCreate} 
    />
  </>
}