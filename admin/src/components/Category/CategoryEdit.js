import { SimpleForm } from "../UI/SimpleForm"
import { get_category_by_id, edit_category } from '../../api/api'
import { useState, useEffect } from 'react'
import { useHistory, useRouteMatch } from "react-router-dom"
import { PageTitle } from "../UI/PageTitle"

export const CategoryEdit = () => {
  const [titleUa, setTitleUa] = useState("")
  const [titleEn, setTitleEn] = useState("")
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const match = useRouteMatch()
  const history = useHistory()

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true)
      const fetchedItem = await get_category_by_id(match.params.id)
      setTitleUa(fetchedItem.title_ua)
      setTitleEn(fetchedItem.title_en)
      setLoading(false)
      console.log(titleUa, titleEn, image)
    }
    fetchCategory()
  }, [match.params.id])

  const onCategoryEdit = async (event, data, id) => {
    event.preventDefault()
    const formdata = new FormData()
    formdata.append('title_ua', titleUa)
    formdata.append('title_en', titleEn)
    formdata.append('image', image)
    await edit_category(formdata, match.params.id)
    history.push('/categories')
  }
  

  return loading ? <div>Loading...</div> : <>
    <PageTitle text={`Edit category`} />
    <SimpleForm 
      title_ua={titleUa}
      title_en={titleEn}
      image={image} 
      onFormSubmit={onCategoryEdit} 
      onTitleOneInputChange={e => setTitleUa(e.target.value)}
      onTitleTwoInputChange={e => setTitleEn(e.target.value)}
      onFileInputChange={e => setImage(e.target.files[0])}
    />
  </>
}