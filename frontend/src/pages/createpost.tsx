import "@/styles/create-post.css"
import { Send, ImagePlus, X } from "lucide-react";
import { ChangeEvent, useState } from "react";
import ReactMarkdown from 'react-markdown';
import TagInput from "@/components/taginput";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const navigate = useNavigate();

  function handleAttachImage(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
      setImages([...images, ...fileArray]);
    }
  }

  const submitPost = async () => {
    const formData = new FormData();

    // Add text data
    formData.append("postTitle", title || "");
    formData.append("postContent", content || "");
    formData.append("tags", JSON.stringify(tags));

    console.log("Post Title:", title);
    console.log("Post Content:", content);
    console.log("Tags:", tags);

    for (let i = 0; i < images.length; i++) {
      const file = await imageUrlToFile(images[i]);
      formData.append('images', file)
    }

      try {
        const response = await fetch("http://localhost:3001/submitpost", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          navigate("/");
        } else {
          const errorMessage = await response.text();
          toast.error(`${errorMessage || "Server Error"}`);
        }
      } catch (error: unknown) {
        console.log(error);
      }
    };

    const imageUrlToFile = async (url: string): Promise<File> => {
      const response = await fetch(url);
      const blob = await response.blob();
      return new File([blob], 'image.jpg', { type: blob.type });
    };

  return (
    <main>
      <div className="create-post-container">
          <div className="create-post-body">
            <div className="create-post-header">
              <textarea
                name="title"
                id="title"
                placeholder="Add a Title..."
                onChange={(e) => setTitle(e.target.value)}
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
                  onChange={(e) => setContent(e.target.value)}/>
              </div>

              <ReactMarkdown className="create-post-MD" children={content}/>

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
                onChange={handleAttachImage} />
            </div>
          </div>

          <div className="post-sidebar">
            <div className='sidebar-button'>
              <button
                className={`round-button`}
                onClick={submitPost}>
                <Send className="icon" />
              </button>
            </div>

            <div className='sidebar-button'>
              <button
                className={`round-button`}
                onClick={() => document.getElementById("fileInput")?.click()}>
                <ImagePlus className="icon" />
              </button>
            </div>
          </div>
      </div>
    </main>
  )
}