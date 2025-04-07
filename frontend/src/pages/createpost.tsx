import "@/styles/create-post.css"

import { Send, ImagePlus, X } from "lucide-react";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";

import { ImageBuffer } from "@models/postType";
import { AuthContext } from "@helpers/context";
import { makeServerURL } from "@helpers/url";
import TagInput from "@components/taginput";
import RouteMap from "@components/map/routemap";

const maxBodyLength = 1500;
const maxTitleLength = 100;
const maxTagListLength = 20;

export default function CreatePost() {
  const { publicId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [origin, setOrigin] = useState({ id: "", place: "" });
  const [destination, setDestination] = useState({ id: "", place: "" });
  const [isDisabled, setDisabled] = useState(false);
  const [username, setUsername] = useContext(AuthContext);
  const navigate = useNavigate();

  // grab information if editing
  useEffect(() => {
    if (!publicId) return;

    async function fetchData() {
      const response = await fetch(makeServerURL(`retrievepost/${publicId}`));

      if (response.ok) {
        const { post } = await response.json();
        setTitle(post.title);
        setContent(post.body);
        setTags(post.tags);
        setImages(post.images.map((image: ImageBuffer) => image.imageUrl));
        setOrigin(post.origin);
        setDestination(post.destination);
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
    try {
      setDisabled(true);
      const formData = new FormData();

      // Add text data
      formData.append("postTitle", title || "");
      formData.append("postContent", content || "");
      formData.append("tags", JSON.stringify(tags));
      formData.append("origin", JSON.stringify(origin));
      formData.append("destination", JSON.stringify(destination));

      // console.log("Post Title:", title);
      // console.log("Post Content:", content);
      // console.log("Tags:", tags);

      for (let i = 0; i < images.length; i++) {
        const file = await imageUrlToFile(images[i]);
        formData.append('images', file)
      }

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
    } finally {
      setDisabled(false);
    }
  };

  async function handleEdit() {
    try {
      setDisabled(true);
      const formData = new FormData();

      formData.append("publicId", publicId || "");
      formData.append("postTitle", title || "");
      formData.append("postContent", content || "");
      formData.append("tags", JSON.stringify(tags));
      formData.append("origin", JSON.stringify(origin));
      formData.append("destination", JSON.stringify(destination));

      for (let i = 0; i < images.length; i++) {
        const file = await imageUrlToFile(images[i]);
        formData.append('images', file)
      }

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
    } finally {
      setDisabled(false);
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
              maxLength={maxTitleLength} />
            <span
              className={
                `counter ${title.length == maxTitleLength ? "counter-max" :
                  title.length > maxTitleLength * 0.666 ? "counter-overflow" : ""
                } `}>
              {title.length + `/${maxTitleLength} `}
              {title.length == maxTitleLength ? <b>Max!!</b> :
                title.length > maxTitleLength * 0.666 ? <i>Warning!</i> : ""}
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
                value={content}
                maxLength={maxBodyLength}/>

              <span
                className={
                  `counter ${content.length == maxBodyLength ? "counter-max" :
                    content.length > maxBodyLength * 0.666 ? "counter-overflow" : ""
                  }`}>
                { content.length + `/${maxBodyLength} `}
                { content.length == maxBodyLength ? <b>Max!!</b> :
                  content.length > maxBodyLength * 0.666 ? <i>Warning!</i> : ""}
              </span>
            </div>

            <ReactMarkdown className="create-post-MD" children={content} />

            <RouteMap
              origin={origin}
              destination={destination}
              setOrigin={setOrigin}
              setDestination={setDestination}
              isEditable={true} />

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
            <TagInput tags={tags} setTags={setTags} disabled={tags.length >= 20}/>

            <span
              className={
                `counter tag-counter`}>
              {tags.length + `/${maxTagListLength} `}
            </span>

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
              onClick={publicId ? handleEdit : handleSubmit}
              disabled={isDisabled}>
              <span className="create-post-text">Create</span>
              <Send className="icon small"/>
            </button>
          </div>

          <div className='sidebar-button'>
            <button
              className={`round-button`}
              onClick={() => document.getElementById("fileInput")?.click()}>
              <span className="create-post-text">Add</span>
              <ImagePlus className="icon small" />
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
