import axios from 'axios'
import ReactQuill, { Quill } from 'react-quill'
import ImageUploader from 'quill-image-uploader'
import { makeStyles } from '@material-ui/styles'
import katex from "katex";
import { useState, useEffect, useRef, useCallback } from 'react'
import getSlug from 'speakingurl'
import { useHistory } from 'react-router-dom'
import { Button, Container, TextField } from '@material-ui/core'
import { InnerItem } from '../UI/InnerItem'
import { get_tags, create_tag, get_categories, create_category } from '../../api/api'

import '../../../node_modules/react-quill/dist/quill.snow.css'
import "katex/dist/katex.min.css";

window.katex = katex;

const useStyles = makeStyles(theme => ({
  btnHolder: {
    textAlign: 'center',
    margin: '2rem'
  },
  input: {
    paddingBottom: '10px',
    borderradius: 0,
    // margin: '10px 0'
  }
}))

export const PostCreate = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [body, setBody] = useState("")
  const quillRef = useRef(null)
  const styles = useStyles()
  const history = useHistory()
  
  const [tags, setTags] = useState([])
  const [categories, setCategories] = useState([])
  
  const [tagInput, setTagInput] = useState("")

  const [posterfile, setPosterFile] = useState()
  const [posterImage, setPosterImage] = useState()

  const [galleryInput, setGalleryInput] = useState()
  const [galleryImages, setGalleryImages] = useState()

  const [posterVideo, setPosterVideo] = useState("")
  const [categoryInput, setCategoryInput] = useState("")
  
  
  useEffect(() => {
    const setInnerItems = async () => {
      setTags(await get_tags())
      setCategories(await get_categories())
    }
    setInnerItems()
  }, [])

  const onPosterSubmit = event => {
    event.preventDefault()
    return new Promise((resolve, reject) => {
      const innerServerUrl = "http://localhost:5000/api/actions/upload"
      const rf = new FileReader();
      rf.readAsDataURL(posterfile); // file is from a useState() hook
      rf.onloadend = event => {
        const data = new FormData();
        data.append("image", posterfile); //To delete 'data:image/png;base64,' otherwise imgbb won't process it.
        console.log(data)
        fetch(innerServerUrl, { method: "POST", body: data })
          .then(response => response.json())
          .then(result => {
            console.log(result)
            console.log(result.data.filepath)
            setPosterImage(result.data.filepath)
            resolve(result.data.filepath)
          })
          .catch(error => {
            reject("Upload failed")
            console.log(error)
          })
      }
    })
  }

  const onGallerySubmit = event => {
    event.preventDefault()
    return new Promise((resolve, reject) => {
      const galleryFormData = new FormData()
      const postUrl = "http://localhost:5000/api/actions/upload-gallery"
      const fr = new FileReader()
      fr.onloadend = event => {

      }
      for (let key of Object.keys(galleryInput)) {
        galleryFormData.append('images', galleryInput[key])
      }

    })
  }

  // adding of tags and categories 
  const onAddTag = async event => {
    event.preventDefault()
    try {
      await create_tag({title: tagInput})
      console.log("new post has been created!")
    } catch (error) { 
      console.log(error)
      history.push('/posts/create')
    }
    setTags([...tags, {title: tagInput}])
    setTagInput("")
  }
  

  const onAddCategory = async event => {
    event.preventDefault()
    try {
      await create_category({title: categoryInput})
      console.log("new category has been created!")
    } catch (error) { 
      console.log(error)
      history.push('/posts/create')
    }
    setCategories([...categories, {title: categoryInput}])
    setCategoryInput("")
  }

  // Editor functions and creation of the post
  Quill.register("modules/imageUploader", ImageUploader)

  const onChange = e => {
    console.log(e)
    setBody(e)
  }

  const onSubmit = event => {
    event.preventDefault()

    const post = {
      title: title,
      body: body,
      description: description,
      categories: categories,
      tags: tags,
      posterVideo: posterVideo,
      posterImage: posterImage,
      slug: getSlug(`${title}`.toString(), {
        truncate: 100,
        lang: 'uk',
        separator: '-'
      })
    }

    axios.post('http://localhost:5000/api/posts', post)
      .then(post => console.log(`New post has been created ${post}`))
      .catch(error => console.log(error))

    history.push('/posts')
  }

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'formula'],
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      [{ 'direction': 'rtl' }],                      
      [{ 'size': ['small', false, 'large', 'huge'] }],  
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['link', 'image', 'video'],
      [{ color: [] }, { background: [] }], 
      [{ 'align': [] }],
      ['clean']
    ],
    imageUploader: {
      upload: file => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("image", file);

          fetch(
            "https://api.imgbb.com/1/upload?key=99d909d2e3ea9d2f51874bfd26b56f7f",
            // "http://localhost:5000/api/actions/upload",
            {
              method: "POST",
              body: formData
            }
          )
            .then(response => response.json())
            .then(result => {
              console.log(result);
              resolve(result.data.filepath);
            })
            .catch(error => {
              reject("Upload failed");
              console.error("Error:", error);
            });
        });
      }
    }
  }

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'align', 'script', 'direction',
    'link', 'image', 'video', 'formula', 'color', 'background'
  ]

  // Custom image
  const handleChangeImage = useCallback(() => {
    const input = document.createElement('input')
    input.type = "file"
    input.accept = "/image/*"
    input.click()
    input.onchange = async () => {
      const file = input.files[0]
      const formData = new FormData()
      formData.append('image', file)
      const res = await axios.post('/api/posts', formData) 

      const range = this.quillEditor.getSelection(true)
      const link = res.data[0].url

      // this part the image is inserted
      // by 'image' option below, you just have to put src(link) of img here. 
      this.quillEditor.insertEmbed(range.index, 'image', link)
  }
    console.log(input)
  }, [])

  useEffect(() => {
    const quill = quillRef.current

    if (!quill) return;

    let toolbar = quill.getEditor().getModule('toolbar')
    toolbar.addHandler('image', handleChangeImage)
  }, [handleChangeImage])

  console.log(tags, categories)

  return <>
    <Container>
      <h1>Create a new post</h1>
      <TextField 
        type="text" 
        name="title" 
        onChange={e => setTitle(e.target.value)} 
        fullWidth
        rows={1}
        label="Title" 
        variant="outlined"
        placeholder="Post title" 
        color="primary"
        className={styles.input}
        style={{borderradius: 0}}
        inputProps={{ borderradius: 0 }}
      />

      <TextField 
        type="text" 
        name="description" 
        multiline
        rows={5}
        label="Description" 
        variant="outlined"
        placeholder="Post description" 
        color="primary"
        className={styles.input}
        fullWidth
        onChange={e => setDescription(e.target.value)}
      />

      <ReactQuill
        theme="snow"
        placeholder="Post body"
        modules={modules}
        formats={formats}
        ref={quillRef}
        onChange={onChange}
      />

      <TextField 
        type="text" 
        name="video-poster" 
        multiline
        rows={2}
        label="Video poster" 
        variant="outlined"
        placeholder="Copy link to external video" 
        color="primary"
        className={styles.input}
        fullWidth
        style={{ margin: '10px 0' }}
        onChange={e => setPosterVideo(e.target.value)}
      />  

    <h1>Choose image poster</h1>
    <form onSubmit={onPosterSubmit} encType="multipart/form-data">    
      <input type="file" name="image" onChange={e => setPosterFile(e.target.files[0])} />
      <img 
        src={`http://localhost:5000/${posterImage}`} 
        style={{ 
          display: posterImage ? "block" : "none", 
          maxWidth: '30%', 
          padding: '10px 0', 
          textAlign: 'center', 
          margin: '10px auto' 
      }}  
      />
      <button type="submit">Apply</button>
    </form>

    <h1>Create image collection</h1>
    <form onSubmit={onGallerySubmit} encType="multipart/form-data">    
      <input type="file" name="images" onChange={e => setGalleryInput(e.target.files)} multiple />
      <img 
        src={`http://localhost:5000/${posterImage}`} 
        style={{ display: posterImage ? "block" : "none", maxWidth: '100%' }}  
      />
      <button type="submit">Apply</button>
    </form>

      <InnerItem 
        placeholder="tag" 
        onItemInputChange={e => setTagInput(e.target.value)} 
        onAddItem={onAddTag}
        onRemoveItem={id => setTags(tags.filter(item => item._id !== id))} 
        itemValue={tagInput} 
        items={tags} 
      />

      <InnerItem 
        placeholder="category" 
        onItemInputChange={e => setCategoryInput(e.target.value)} 
        onAddItem={onAddCategory}
        onRemoveItem={id => setCategories(categories.filter(item => item._id !== id))} 
        itemValue={categoryInput} 
        items={categories} 
      />

      <form onSubmit={onSubmit}>
        <div className={styles.btnHolder}>
          <Button color="primary" variant="contained" type="submit">Submit</Button>
        </div>
      </form>
      </Container>
  </>
}
