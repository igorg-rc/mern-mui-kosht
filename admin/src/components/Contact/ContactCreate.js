import { useState } from "react"
import { create_contact } from "../../api/api"
import { SimpleForm } from "../UI/SimpleForm"
import { PageTitle } from "../UI/PageTitle"
import { useHistory } from "react-router-dom"

export const ContactCreate = () => {
  const history = useHistory()
  const [title, setTitle] = useState("")
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const onCategoryCreate = async e => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('title', title)
    formdata.append('image', file)
    await create_contact(formdata)
    history.push('/contacts')
  }

  return loading ? <div>Loading...</div> : <>
    <PageTitle text="Create new contact" />
    <SimpleForm 
      onInputChange={e => setTitle(e.target.value)} 
      onFormSubmit={onCategoryCreate} 
      onFileInputChange={e => setFile(e.target.files[0])}
    />
  </>
}