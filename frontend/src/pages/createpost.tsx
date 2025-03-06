import "@/styles/create-post.css"
import { Send, Paperclip, Bold, Italic, Underline } from "lucide-react";
import { ChangeEvent, useState } from "react";
import ReactMarkdown from 'react-markdown'
import TagInput from "@/components/taginput";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [isEditingPost, setIsEditingPost] = useState(false);
    const [isBold, setBold] = useState(false);
    const [isItalic, setItalic] = useState(false);
    const [isUnderline, setUnderline] = useState(false);

    function handleTitleEdit(event: ChangeEvent<HTMLTextAreaElement>) {
        setTitle(event.target.value)
    }

    function handleEditorEdit(event: ChangeEvent<HTMLTextAreaElement>) {
        setContent(event.target.value);
    }

    function handleClickContent() {
        setIsEditingPost(true);
        document.getElementById("editor")?.focus();
    }

    function handleAttachImage(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            const fileArray = Array.from(event.target.files).map((file) => URL.createObjectURL(file)
        );
        setImages([...images, ...fileArray]);
    }
}


    function submit() {
        console.log({
            title, content, tags
        })
    }

    return (
        <main>
            <div className="create-post-container">
                <div className="post-container new-post">
                    <div className="post-body">
                        <div className="create-post-header">
                            <textarea
                                name="title"
                                id="title"
                                placeholder="Add a Title..."
                                onInput={handleTitleEdit} />
                        </div>

                        <div className="create-post-main">
                            <textarea
                                name="editor"
                                id="editor"
                                placeholder="Start typing here..."
                                onInput={handleEditorEdit}
                                onBlur={() => setIsEditingPost(false)}
                                onFocus={() => setIsEditingPost(true)} />
                            <div className={`content-container  ${isEditingPost ? "zback" : ""}`} onClick={handleClickContent}>
                                <ReactMarkdown children={content} />
                            </div>

                            <div className="image-preview">
                                {images.map((img, index) => (
                                    <img key={index} src={img} alt={`attachment-${index}`} className="post-image" />
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
                                <Send className="icon" />
                            </button>
                        </div>

                        <div className='sidebar-button'>
                            <button
                                className={`round-button`}
                                onClick={() => document.getElementById("fileInput")?.click()}>
                                <Paperclip className="icon" />
                            </button>
                        </div>

                        <div className='sidebar-button'>
                            <button
                                className={`round-button ${isBold ? "active" : "" }`}
                                onClick={() => setBold(!isBold)}>
                                <Bold className="icon" />
                            </button>
                        </div>

                        <div className='sidebar-button'>
                            <button
                                className={`round-button ${isItalic ? "active" : "" }`}
                                onClick={() => setItalic(!isItalic)}>
                                <Italic className="icon" />
                            </button>
                        </div>

                        <div className='sidebar-button'>
                            <button
                                className={`round-button ${isUnderline ? "active" : "" }`}
                                onClick={() => setUnderline(!isUnderline)}>
                                <Underline className="icon" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}