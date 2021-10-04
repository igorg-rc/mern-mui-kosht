import { Link } from 'react-router-dom'
import { FileUpload } from '../../utils/Utils'

export const PostIndex = () => {
  return <>
    <h1>PostIndex</h1>
    <Link to="/posts/create">Create new post</Link>
    <FileUpload />
  </>
}