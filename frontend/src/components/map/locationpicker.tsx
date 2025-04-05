import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export default function LocationInput({
  label,
  value = { id: "", place: "" },
  onChange,
}: {
  label: string;
  value?: { id: string, place: string };
  onChange: Dispatch<SetStateAction<{ id: string; place: string; }>>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [suggestions, setSuggestions] = useState<{id: string, place: string}[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchSuggestions() {
      if (value.place.trim() === "") return;

      try {
        const res = await fetch(`https://places.googleapis.com/v1/places:autocomplete`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': import.meta.env.VITE_MAPS_API_KEY,
        },
        body: JSON.stringify({
          input: value.place,
          locationBias: {
          circle: {
            center: {
              latitude: 13.41,
              longitude: 122.56,
            },
            radius: 300.0,
          }
        }
        }),
      });

      if (!res.ok) return;

      const data = await res.json();
      // console.log(data, data.suggestions);

      setSuggestions(data.suggestions?.map((suggestion: any) => ({
        id: suggestion.placePrediction.placeId,
        place: suggestion.placePrediction.text.text,
      })) || []);

      } catch (error) {
        console.error(error);
      }
    }

    fetchSuggestions();
  }, [value]);

  // useEffect(() => {
  //   console.log("Updated suggestions:", suggestions);
  // }, [suggestions]);

  function clearSuggestions() {
    setTimeout(() => {
      setSuggestions([])
      setSelectedIndex(0)
    }, 100);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (selectedIndex !== null && suggestions[selectedIndex]) {
        onChange(suggestions[selectedIndex]);
      }
      clearSuggestions();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prevIndex) => (prevIndex === null ? 0 : Math.min(prevIndex + 1, suggestions.length - 1)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prevIndex) => (prevIndex === null ? 0 : Math.max(prevIndex - 1, 0)));
    }
  }

  return (
    <div className="location-input-wrapper">
      <input
        ref={inputRef}
        value={value.place}
        onChange={(e) => {
          if (e.target.value.trim() === "") {
            clearSuggestions();
          }
          onChange({ id: "", place: e.target.value })
        }}
        onKeyDown={(e) => handleKeyDown(e)}
        onBlur={() => setTimeout(() => setSuggestions([]), 100)}
        placeholder={label}
        className="location-input" />

      { suggestions.length > 0 && (
        <ul className="location-suggestions-wrapper">
          { suggestions.map((text, i) => (
            <li
              key={i}
              onMouseDown={() => {
                console.log(text);
                onChange({ id: text.id, place: text.place });
                clearSuggestions();
              }}

              className={`location-suggestions ${selectedIndex === i ? "selected" : ""}`}>
              {text.place}
            </li>
          ))}
        </ul>
      )
    }
    </div >
  );
}
