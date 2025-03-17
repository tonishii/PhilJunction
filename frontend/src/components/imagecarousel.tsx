import "@/styles/component-styles.css";

import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { IPostImage } from "@/models/postType";

export default function ImageCarousel({
  images = [],
  maxImages,
}: {
  images?: IPostImage[],
  maxImages: number;
}) {
  const [currImageIndex, setImageIndex] = useState(0);

  return (
    <div className="image-carousel">
      {images.length > 2 && (
        <button className="image-button" onClick={() => setImageIndex((prevIndex) => prevIndex === images.length - 1 ? 0 : prevIndex + 1)}>
          <ChevronLeft />
        </button>
      )}

      {images.slice(currImageIndex, currImageIndex + maxImages).map((imageUrl, i) => (
        <img
          key={currImageIndex + i}
          src={imageUrl.imageUrl}
          alt="post image"
          className="post-image"
        />
      ))}

      {images.length > 2 && (
        <button className="image-button" onClick={() => setImageIndex((prevIndex) => prevIndex === 0 ? images.length - 1 : prevIndex - 1)}>
          <ChevronRight />
        </button>
      )}
    </div>
  );
}
