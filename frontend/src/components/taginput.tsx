import React, { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";

const maxTagLength = 20;
const minTagLength = 2;

export default function TagInput({
    tags,
    setTags,
    disabled = false,
}: {
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
    disabled?: boolean;
}) {
    const [newTag, setNewTag] = useState("");

    function handleAddTags() {
        const tag = newTag.trim();
        if (tag.length < minTagLength) {
            toast.info(`Tags must be atleast ${minTagLength} characters long.`);
            return;
        }

        if (tag.length > maxTagLength) {
            toast.info(`Tags exceeds the maximum length of ${maxTagLength}.`);
            return;
        }

        if (tag !== "" && !tags.includes(tag)) {
            setTags([...tags, tag]);
        }
        setNewTag("");
    }

    function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
        if (disabled) return;

        if (e.key === "Enter") {
            e.preventDefault();
            handleAddTags();
        } else if ((e.key === "Backspace" || e.key === "Delete") && newTag.trim() === "") {
            e.preventDefault();
            setTags(prev => prev.slice(0, -1));
        }
    }

    return (
        <div className="tags-input">
            { tags.map((tag, index) => (
                <span key={tag + index} className="tag">
                    {tag}
                    <button onClick={() => setTags(tags.filter((_, i) => i !== index))}><X size={15}/></button>
                </span>
            ))}
           { !disabled && <input
                type="text"
                name="tag"
                id="tag"
                value={newTag}
                placeholder="Add a tag..."
                onChange={(e) => {
                    e.preventDefault();
                    setNewTag(e.target.value);
                }}
                onKeyUp={handleKeyUp}
            />}
        </div>
    )
}
