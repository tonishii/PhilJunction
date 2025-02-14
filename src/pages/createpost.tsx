import "@/styles/create-post.css"
import { ChangeEvent, useState } from "react";
import ReactMarkdown from 'react-markdown'

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isEditingPost, setIsEditingPost] = useState(false);

    function handleTitleEdit(event: ChangeEvent<HTMLTextAreaElement>) {
        setTitle(event.target.value)
    }

    function handleEditorEdit(event: ChangeEvent<HTMLTextAreaElement>) {
        setContent(event.target.value);
    }

    return (
        <main>
            <div className="container">
                <div className="post-container new-post">
                    <div className="post-body">
                        <div className="post-header">
                            <textarea name="title" id="title" placeholder="Title..." onInput={handleTitleEdit} />
                        </div>
                        <div className="post-main">
                            {
                                isEditingPost ?
                                    <textarea name="editor" id="editor" placeholder="start typing here..." onInput={handleEditorEdit} onBlur={() => setIsEditingPost(false)} /> :
                                    <div className="content-container" onClick={() => setIsEditingPost(true)}>
                                        <ReactMarkdown children={content} />
                                    </div>
                            }


                        </div>
                        <div className="post-footer">
                        </div>
                    </div>
                    <div className="post-sidebar">
                    </div>

                </div>
            </div>
        </main>
    )
}