// import React from "react";
// import ReactQuill from "react-quill";
// import katex from "katex";
// import "katex/dist/katex.min.css";
// window.katex = katex;

// export const Editor = () => {
//   const modules = {
//     toolbar: [
//       ['bold', 'italic', 'underline', 'strike', 'blockquote', 'formula'],
//       [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
//       [{ 'script': 'sub'}, { 'script': 'super' }],
//       [{'list': 'ordered'}, {'list': 'bullet'}, 
//        {'indent': '-1'}, {'indent': '+1'}],
//        [{ 'direction': 'rtl' }],                      
//        [{ 'size': ['small', false, 'large', 'huge'] }],  
//        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//       ['link', 'image', 'video'],
//       [{ color: [] }, { background: [] }], 
//       [{ 'align': [] }],
//       ['clean']
//     ]
//   }

//   const formats = [
//     'header', 'font', 'size',
//     'bold', 'italic', 'underline', 'strike', 'blockquote',
//     'list', 'bullet', 'indent', 'align', 'script', 'direction',
//     'link', 'image', 'video', 'formula', 'color', 'background'
//   ]

//   return <>
//     <ReactQuill
//       theme="snow"
//       placeholder="Write something here"
//       modules={modules}
//       formats={formats}
//     />
//   </>
// }

import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill";

// #1 import quill-image-uploader
import ImageUploader from "quill-image-uploader";

// #2 register module
Quill.register("modules/imageUploader", ImageUploader);

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: ""
    };
  }

  modules = {
    // #3 Add "image" to the toolbar
    toolbar: [
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'formula'],
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
       [{ 'direction': 'rtl' }],                      
       [{ 'size': ['small', false, 'large', 'huge'] }],  
       [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['link', 'image', 'video'],
      [{ color: [] }, { background: [] }], 
      [{ 'align': [] }],
      ['clean']
    ],
    // # 4 Add module and upload function
    imageUploader: {
      upload: file => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("image", file);

          fetch(
            "https://api.imgbb.com/1/upload?key=d36eb6591370ae7f9089d85875e56b22",
            {
              method: "POST",
              body: formData
            }
          )
            .then(response => response.json())
            .then(result => {
              console.log(result);
              resolve(result.data.url);
            })
            .catch(error => {
              reject("Upload failed");
              console.error("Error:", error);
            });
        });
      }
    }
  };

  formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'align', 'script', 'direction',
    'link', 'image', 'video', 'formula', 'color', 'background'
  ];

  render() {
    return (
      <ReactQuill
        theme="snow"
        modules={this.modules}
        formats={this.formats}
        value={this.state.body}
      >
        <div className="my-editing-area" />
      </ReactQuill>
    );
  }
}

export default Editor;
