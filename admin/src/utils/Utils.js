import { useState } from "react"
// import axios from "axios"

export const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState()
  const [fileName, setFileName] = useState("")

  const onFileChange = e => {
    setSelectedFile(e.target.files[0])
    setFileName(e.target.value)
  }

  const onUploadFile = event => {
    event.preventDefault()
    return new Promise((resolve, reject) => {
      const innerServerUrl = "http://localhost:5000/api/actions/upload"
      const rf = new FileReader();
      rf.readAsDataURL(selectedFile); // file is from a useState() hook
      rf.onloadend = event => {
        const data = new FormData();
        data.append("image", selectedFile); //To delete 'data:image/png;base64,' otherwise imgbb won't process it.
        console.log(data)
        fetch(innerServerUrl, { method: "POST", body: data })
          .then(response => response.json())
          .then(result => {
            console.log(result)
            console.log(result.data.filepath)
            resolve(result.data.filepath)
          })
          .catch(error => {
            reject("Upload failed")
            console.log(error)
          })
      }
    })
  }

  //======================== Uploader for imgbb service =======================//
  // const onUploadFile = event => {
  //   event.preventDefault()
  //   return new Promise((resolve, reject) => {
  //     const ImgbbUrl = "https://api.imgbb.com/1/upload?key=99d909d2e3ea9d2f51874bfd26b56f7f"
  //     const rf = new FileReader();
  //     rf.readAsDataURL(selectedFile); // file is from a useState() hook
  //     rf.onloadend = event => {
  //       const body = new FormData();
  //       body.append("image", event.target.result.split(",").pop()); //To delete 'data:image/png;base64,' otherwise imgbb won't process it.
  //       body.append("filename", fileName);
  //       console.log(body)
  //       fetch(ImgbbUrl, { method: "POST", body: body })
  //         .then(response => response.json())
  //         .then(result => {
  //           console.log(result)
  //           console.log(result.data.url)
  //           resolve(result.data.url)
  //         })
  //         .catch(error => {
  //           reject("Upload failed")
  //           console.log(error)
  //         })
  //     }
  //   })
  // }

  return <>
    <h1>File upload</h1>
    <form onSubmit={onUploadFile} encType="multipart/form-data">    
      <input type="file" name="image" onChange={onFileChange} multiple  />
      <button type="submit">Upload file</button>
    </form>

  </>
}