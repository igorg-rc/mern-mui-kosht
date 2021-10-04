import { useEffect,  useState} from "react"
import { useRouteMatch } from "react-router-dom"
import { get_contact_by_id } from "../../api/api"
import { SimpleForm } from "../UI/SimpleForm"

export const ContactEdit = () => {
  const [loading, setLoading] = useState(false)
  // const [contact, setContact] = useState(null)
  const [title, setTitle] = useState("")
  const [file, setFile] = useState(null)
  const match = useRouteMatch()

  useEffect(() => {
    const fetchContact = async () => {
      setLoading(true)
      const fetchedContact = await get_contact_by_id(match.params.id)
      console.log(fetchedContact)
      console.log(fetchedContact.data.title)
      console.log(fetchedContact.data.imgUrl)
      setTitle(fetchedContact.data.title)
      setFile(fetchedContact.data.imgUrl)
      setLoading(false)
    } 
    fetchContact()
  }, [match.params.id])

  const onContactEdit = e => {
    e.preventDefault()
    
  }

  return <>
    <h1>Contact edit</h1>
    <SimpleForm 
      onFormSubmit={onContactEdit} 
      onInputChange={e => setTitle(e.target.value)}
      onFileInputChange={e => setFile(e.target.files[0])}
      title={title}
      image={file}
    />
  </>
}