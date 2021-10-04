import axios from 'axios'
const LOCALHOST = `http://localhost:5000/api`
const POSTS_URL = `${LOCALHOST}/posts`
const TAGS_URL = `${LOCALHOST}/tags`
const CATEGORIES_URL = `${LOCALHOST}/categories/`
const CONTACTS_URL = `${LOCALHOST}/contacts`
// const EDITOR_CHOICE_URL = 'http://localhost:5000/api/editor_choice'

// categories API actions
export const get_categories = () => axios.get(CATEGORIES_URL)
  .then(res => res.data)
  .catch(error => console.log(error))

export const get_category_by_id = id => axios.get(`${CATEGORIES_URL}/id/${id}`)
  .then(res => res.data)
  .catch(error => console.log(error))

export const create_category = category => axios.post(CATEGORIES_URL, category)
  .then(category => console.log("New category was successfuly created", category.data))
  .catch(error => console.log(error))

export const edit_category = (category, id) => axios.patch(`${CATEGORIES_URL}/id/${id}`, category)
  .then(category => console.log(`Category was successfuly updated: ${category}`))
  .catch(error => console.log(error))

export const delete_category = id => axios.delete(`${CATEGORIES_URL}/id/${id}`)
  .then(id => console.log(`Category with id ${id} was successfuly deleted.`))
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


// tags API actions
export const get_tags = () => axios.get(TAGS_URL)
  .then(res => res.data)
  .catch(error => console.log(error))

export const get_tag = id => axios.get(`${TAGS_URL}/id/${id}`)
  .then(res => res.data)
  .catch(error => console.log(error))

export const create_tag = tag => axios.post(TAGS_URL, tag)
  .then(tag => console.log(`Tag was successfully created: ${tag.data}`))
  .catch(error => console.log(error))

export const edit_tag = (tag, id) => axios.patch(`${TAGS_URL}/${id}`, tag)
  .then(tag => console.log(`Tag was successfuly updated: ${tag}`))
  .catch(error => console.log(error))

export const delete_tag = id => axios.delete(`${TAGS_URL}/${id}`)
  .then(id => console.log(`Tag was successfuly deleted: ${id}`))
  .catch(error => console.log(error))


// posts API actions
export const get_posts = () => axios.get(POSTS_URL)
  .then(res => res.data)
  .catch(error => console.log(error))

export const get_post = id => axios.get(`${POSTS_URL}/${id}`)
  .then(res => res.data)
  .catch(error => console.log(error))

export const create_post = post => axios.post(POSTS_URL, post)
  .then(post => console.log(`New post was successfuly created: ${post}`))
  .catch(error => console.log(error))

export const edit_post = (post, id) => axios.patch(`${POSTS_URL}/${id}`, post)
  .then(post => console.log(`Post was successfuly updated: ${post}`))
  .catch(error => console.log(error))

export const delete_post = id => axios.delete(`${POSTS_URL}/${id}`)
  .then(id => console.log(`Post with id ${id} was successfuly deleted.`))
  .catch(error => console.log(error))

// editor choice API acions
// export const get_posts = () => axios.get(EDITOR_CHOICE_URL)
//   .then(res => res.data)
//   .catch(error => console.log(error))

// export const get_post = id => axios.get(`${EDITOR_CHOICE_URL}/${id}`)
//   .then(res => res.data)
//   .catch(error => console.log(error))

// export const create_post = post => axios.post(EDITOR_CHOICE_URL.concat, post)
//   .then(post => console.log(`New post was successfuly created: ${post}`))
//   .catch(error => console.log(error))

// export const edit_post = (post, id) => axios.patch(`${EDITOR_CHOICE_URL}/${id}`, post)
//   .then(post => console.log(`Post was successfuly updated: ${post}`))
//   .catch(error => console.log(error))

// export const delete_post = id => axios.delete(`${EDITOR_CHOICE_URL}/${id}`)
//   .then(id => console.log(`Post with id ${id} was successfuly deleted.`))