import axios from 'axios'

const LOCALHOST_URL = 'http://localhost:5000/api'
const POSTS_URL = `${LOCALHOST_URL}/posts`
const READ_MORE_URL = `${LOCALHOST_URL}/posts/readmore`
const TAGS_URL = `${LOCALHOST_URL}/tags`
const CONTACTS_URL = `${LOCALHOST_URL}/contacts`
const CATEGORIES_URL = `${LOCALHOST_URL}/categories`
const POSTS_BY_TAGS_URL = `${LOCALHOST_URL}/posts/tags`
const POSTS_BY_CATEGORY_URL = `${LOCALHOST_URL}/posts/categories`
const LISTS_URL = `${LOCALHOST_URL}/lists`

// Get all posts
export const get_posts = () => axios.get(POSTS_URL)
  .then(res => res.data)
  .catch(error => console.log(error))

// Get post by id
export const get_post_by_id = id => axios.get(`${POSTS_URL}/id/${id}`)
  .then(res => res.data)
  .catch(error => console.log(error))

// Get post by slug
export const get_post_by_slug = slug => axios.get(`${POSTS_URL}/slug/${slug}`)
.then(res => res.data)
.catch(error => console.log(error))

// Get all tags
export const get_tags = () => axios.get(TAGS_URL)
  .then(res => res.data)
  .catch(error => console.log(error))

// Get all categories
export const get_categories = () => axios.get(CATEGORIES_URL)
  .then(res => res.data)
  .catch(error => console.log(error))

// Get all lists
export const get_lists = () => axios.get(LISTS_URL)
  .then(res => res.data)
  .catch(error => console.log(error))

export const get_list_by_id = id => axios.get(`${LISTS_URL}/${id}`)
  .then(res => res.data)
  .catch(error => console.log(error))

// Get posts by tag 
export const get_posts_by_tag = tag => axios.get(`${POSTS_BY_TAGS_URL}/${tag}`)
  .then(res => res.data)
  .catch(error => console.log(error))


// Get posts by category 
export const get_posts_by_category = category => axios.get(`${POSTS_BY_CATEGORY_URL}/${category}`)
  .then(res => res.data)
  .catch(error => console.log(error))


// contacts API actions
export const get_contacts = () => axios.get(CONTACTS_URL)
  .then(res => res.data)
  .catch(error => console.log(error))

export const get_contact_by_id = id => axios.get(`${CONTACTS_URL}/${id}`)
  .then(res => res.data)
  .catch(error => console.log(error))

export const create_contact = contact => axios.post(CONTACTS_URL, contact)
  .then(contact => console.log("New contact was successfuly created", contact))
  .catch(error => console.log(error))

export const edit_contact = (contact, id) => axios.patch(`${CONTACTS_URL}/${id}`, contact)
  .then(contact => console.log(`Contact was successfuly updated: ${contact}`))
  .catch(error => console.log(error))

export const delete_contact = id => axios.delete(`${CONTACTS_URL}/${id}`)
  .then(res => console.log(`Contact with id ${id} was successfuly deleted.`))
  .catch(error => console.log(error))

export const delete_all_contacts = () => axios.delete(CONTACTS_URL)
  .then(res => console.log(`All contacts were successfuly deleted.`))
  .catch(error => console.log(error))



// Get posts from specific lists 
// Get "read more" posts (current version - 5 latest posts)
export const get_readmore_posts = id => axios.get(`${READ_MORE_URL}/${id}`)
  .then(res => res.data)
  .catch(error => console.log(error))