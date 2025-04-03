import "@/styles/create-post.css"
import { Send, ImagePlus, X } from "lucide-react";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import TagInput from "@/components/taginput";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { ImageBuffer } from "@/models/postType";
import { AuthContext } from "@/hook/context";
import { makeServerURL } from "@/hook/url";

export default function CreatePost() {
  const { publicId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [username, setUsername] = useContext(AuthContext);
  const navigate = useNavigate();

  // grab information if editing
  useEffect(() => {
    if (!publicId) return;

    async function fetchData() {
      const response = await fetch(makeServerURL(`retrievepost/${publicId}`));

      if (response.ok) {
        const { message, post } = await response.json();
        setTitle(post.title);
        setContent(post.body);
        setTags(post.tags);
        setImages(post.images.map((image: ImageBuffer) => image.imageUrl));
        console.log(message);
      } else {
        toast.error("An error has occured");
        console.error(response);
      }
    }

    fetchData();
  }, [publicId]);

  function handleAttachImage(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
      setImages([...images, ...fileArray]);
    }
  }

  const imageUrlToFile = async (url: string): Promise<File> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], 'image.jpg', { type: blob.type });
  };

  async function handleSubmit() {
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
      const response = await fetch(makeServerURL(`submitpost`), {
        method: "POST",
        body: formData,
        credentials: "include"
      });

      if (response.ok) {
        navigate("/");
      } else {
        const errorMessage = await response.json();
        if (response.status === 401) {
          if (username) toast.error("Session has expired!");
          else toast.error("Login in first!");

          setUsername(null);
          navigate("/auth/login");
        } else if (response.status === 400) {
          toast.error("Title, content, and tags are required.");
        } else {
          toast.error("An error has occured.");
          console.error(errorMessage);
        }
      }
    } catch (error: unknown) {

      toast.error("An error has occured.");
      console.error(error);
    }
  };

  async function handleEdit() {
    const formData = new FormData();

    formData.append("publicId", publicId || "");
    formData.append("postTitle", title || "");
    formData.append("postContent", content || "");
    formData.append("tags", JSON.stringify(tags));

    for (let i = 0; i < images.length; i++) {
      const file = await imageUrlToFile(images[i]);
      formData.append('images', file)
    }

    console.log(formData);
    try {
      const res = await fetch(makeServerURL(`updatepost`), {
        method: "POST",
        body: formData,
        credentials: "include"
      });

      const errorMessage = await res.json();

      if (res.ok) {
        navigate("/");
        console.log(errorMessage.message);
      } else {
        if (res.status === 401) {
          if (username) toast.error("Session has expired!");
          else toast.error("Login in first!");

          setUsername(null);
          navigate("/auth/login");
        } else if (res.status === 403) {
          toast.error("This is not your post!");
          navigate("/post/" + publicId);
        }
        else if (res.status === 400) {
          toast.error("Title, content, and tags are required.");
        } else {
          toast.error("An error has occured.");
          console.error(errorMessage);
        }
      }
    } catch (error: unknown) {
      toast.error("An error has occured.");
      console.error(error);
    }
  }



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
              value={title}
              maxLength={100} />
            <span
              className={
                `title-counter ${title.length == 100 ? "title-max" :
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
                onChange={(e) => setContent(e.target.value)}
                value={content} />
            </div>

            <ReactMarkdown className="create-post-MD" children={content} />

            <div className="image-preview">
              {images.map((img, index) => (
                <div key={index} className="create-post-image">
                  <button onClick={() => setImages(images.filter((_, i) => i !== index))}><X size={12} /></button>

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
              onClick={publicId ? handleEdit : handleSubmit}>
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