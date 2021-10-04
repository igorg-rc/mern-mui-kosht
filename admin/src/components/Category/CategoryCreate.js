import { useState } from "react"
import { create_category } from "../../api/api"
import { useHistory } from 'react-router-dom'
import { SimpleForm } from "../UI/SimpleForm"
import { PageTitle } from "../UI/PageTitle"

export const CategoryCreate = () => {
  const [titleUa, setTitleUa] = useState("")
  const [titleEn, setTitleEn] = useState("")
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const onCategoryCreate = async e => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('title_ua', titleUa)
    formdata.append('title_en', titleEn)
    formdata.append('image', image)
    await create_category(formdata)
    history.push('/categories')
  }

  console.log(titleEn, titleUa)

  return loading ? <div>Loading...</div> : <>
    <PageTitle text="Create new category" />
    <SimpleForm 
      onTitleOneInputChange={e => setTitleUa(e.target.value)} 
      onTitleTwoInputChange={e => setTitleEn(e.target.value)} 
      onFileInputChange={e => setImage(e.target.files[0])} 
      onFormSubmit={onCategoryCreate} 
    />
  </>
}