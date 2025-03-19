import "@/styles/component-styles.css";

import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { ImageBuffer } from "@/models/postType";

export default function ImageCarousel({
  images = [],
  maxImages,
}: {
  images?: ImageBuffer[],
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

      { images.length > 0 &&
        Array.from({ length: Math.min(maxImages, images.length) }, (_, i) =>
        images[(currImageIndex + i) % images.length]).map((imageUrl, i) => (
          <img
            key={(currImageIndex + i) % images.length}
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
