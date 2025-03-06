import React, { useState } from "react";
import { X } from "lucide-react";

export default function TagInput({
    tags,
    setTags,
}: {
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
}) {
    const [newTag, setNewTag] = useState("");

    function handleAddTags() {
        if (newTag.trim() !== "" && !tags.includes(newTag)) {
            setTags([...tags, newTag.trim()]);
        }
        setNewTag("");
    }

    function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddTags();
        }
    }

    function handleRemoveTag(index: number) {
        setTags(tags.filter((_, i) => i !== index));
    }

    return (
        <div className="tags-input">
            {tags.map((tag, i) => (
                <span key={tag + i} className="tag">
                    {tag} <button onClick={() => handleRemoveTag(i)}><X size={15}/></button>
                </span>
            ))}
            <input
                type="text"
                name="tag"
                id="tag"
                value={newTag}
                placeholder="Add a tag..."
                onChange={(e) => setNewTag(e.target.value)}
                onKeyUp={handleKeyUp}
            />
        </div>
    )
}