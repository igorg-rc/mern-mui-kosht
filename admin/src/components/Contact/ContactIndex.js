import { Link } from "react-router-dom"
import { SimpleForm } from "../UI/SimpleForm"

export const ContactIndex = () => {
  return <>
    <h1>Contact list</h1>
    <Link to={`/contacts/create`}>Create new contact</Link>
  </>
}