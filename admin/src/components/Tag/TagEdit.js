import { SimpleForm } from "../UI/SimpleForm"
import { get_tag, edit_tag } from '../../api/api'
import { useState, useEffect } from 'react'
import { useHistory, useRouteMatch } from "react-router-dom"
import { PageTitle } from "../UI/PageTitle"

export const TagEdit = () => {
  const [titleUa, setTitleUa] = useState("")
  const [titleEn, setTitleEn] = useState("")
  const [loading, setLoading] = useState(false)
  const match = useRouteMatch()
  const history = useHistory()

  useEffect(() => {
    const fetchTag = async () => {
      setLoading(true)
      const fetchedItem = await get_tag(match.params.id)
      setTitleUa(fetchedItem.title_ua)
      setTitleEn(fetchedItem.title_en)
      setLoading(false)
    }
    fetchTag()
  }, [match.params.id])

  const onTagEdit = async event => {
    event.preventDefault()
    setLoading(true)
    await edit_tag({ 
      title_ua: titleUa,
      title_en: titleEn,
    }, match.params.id)
    setLoading(false)
    history.push('/tags')
  }
  
  return loading ? <div>Loading...</div> : <>
    <PageTitle text={`Edit tag`} />
    <SimpleForm 
      title_ua={titleUa}
      title_en={titleEn}
      onTitleOneInputChange={e => setTitleUa(e.target.value)}
      onTitleTwoInputChange={e => setTitleEn(e.target.value)}
      onFormSubmit={onTagEdit} 
    />
  </>
}