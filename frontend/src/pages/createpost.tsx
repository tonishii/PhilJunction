import "@/styles/create-post.css"
import { BadgePlus, ImagePlus, X } from "lucide-react";
import { ChangeEvent, useState } from "react";
import ReactMarkdown from 'react-markdown';
import TagInput from "@/components/taginput";
import { toast } from "react-toastify";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);

  function handleTitleEdit(event: ChangeEvent<HTMLTextAreaElement>) {
    setTitle(event.target.value);
  }

  function handleEditorEdit(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
  }

  function handleAttachImage(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
      setImages([...images, ...fileArray]);
    }
  }

  function submit() {
    console.log({
      title, content, images, tags
    });
  }

  const submitPost = async () => {
    document.getElementById("fileInput")?.click()
  
      try {
        const response = await fetch("http://localhost:3001/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Object.fromEntries(formData.entries())),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          navigate("/");
        } else {
          const errorMessage = JSON.stringify(result, null, 2);
          toast.error(`${errorMessage || "Server Error"}`);
        }
      } catch (error: unknown) {
        console.log(error);
      }
    };

  return (
    <main>
      <div className="create-post-container">
          <div className="post-body">
            <div className="create-post-header">
              <textarea
                name="title"
                id="title"
                placeholder="Add a Title..."
                onChange={handleTitleEdit}
                maxLength={100}/>
              <span
                className={
                  `title-counter ${
                    title.length == 100 ? "title-max" :
                    title.length > 40 ? "title-overflow" : ""
                  } `}>
                  {title.length + "/40 "}
                  {title.length == 100 ? <b>Max!!</b> :
                   title.length > 40 ? <i>Overflow!</i> : ""}
              </span>
            </div>

            <div className="create-post-main">
              <div className="textarea-wrapper">
                <i className="textarea-header">Editor</i>
                <textarea
                  name="editor"
                  id="editor"
                  placeholder="Start typing here..."
                  onChange={handleEditorEdit}/>
              </div>

              <ReactMarkdown className="create-post-body" children={content}/>

              <div className="image-preview">
                {images.map((img, index) => (
                  <div key={index} className="create-post-image">
                    <button onClick={() => setImages(images.filter((_, i) => i !== index))}><X size={12}/></button>

                    <img
                      key={index}
                      src={img}
                      alt={`attachment-${index}`}
                      className="post-image" />
                  </div>
                ))}
              </div>
            </div>

            <div className="create-post-footer">
              <TagInput tags={tags} setTags={setTags} />

              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="fileInput"
                multiple
                onChange={handleAttachImage}
              />
            </div>
          </div>

          <div className="post-sidebar">
            <div className='sidebar-button'>
              <button
                className={`round-button`}
                onClick={submit}>
                <BadgePlus className="icon" />
              </button>
            </div>

            <div className='sidebar-button'>
              <button
                className={`round-button`}
                onClick={() => }
                onSubmit={submitPost}>
                <ImagePlus className="icon" />
              </button>
            </div>
          </div>
      </div>
    </main>
  )
}