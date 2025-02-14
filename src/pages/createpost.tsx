import "@/styles/create-post.css"
import { CirclePlus, Send, X, Paperclip } from "lucide-react";
import { ChangeEvent, useState } from "react";
import ReactMarkdown from 'react-markdown'

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [newTag, setNewTag] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [isEditingPost, setIsEditingPost] = useState(false);

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

    function handleAddTags() {
        setTags([...tags, newTag])
        setNewTag("");
    }

    function handleRemoveTag(index: number) {
        console.log(index);
        const copy = [...tags];
        copy.splice(index, 1)
        setTags(copy);
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
                            <textarea name="title" id="title" placeholder="Title..." onInput={handleTitleEdit} />
                        </div>

                        <div className="create-post-main">
                            <textarea name="editor" id="editor" placeholder="Start typing here..." onInput={handleEditorEdit} onBlur={() => setIsEditingPost(false)} onFocus={() => setIsEditingPost(true)} />
                            <div className={`content-container zback`} onClick={handleClickContent}>
                                <ReactMarkdown children={content} />
                            </div>
                        </div>

                        <div className="create-post-footer">
                            <div className="new-tag-section">
                                <CirclePlus id="addTags" onClick={handleAddTags} />
                                <input type="text" name="tag" id="tag" value={newTag} onChange={(e) => setNewTag(e.target.value)} onKeyUp={(e) => { if (e.code === "Enter") handleAddTags() }} />
                            </div>
                            <div className="tags-section">
                                {
                                    tags.map((tag, index) => (
                                        <div className="create-tag">
                                            <div className="wrap-tag">
                                                {tag}<X className="remove-tag" onClick={() => handleRemoveTag(index)} />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

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
                                onClick={submit}>
                                <Paperclip className="icon" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}