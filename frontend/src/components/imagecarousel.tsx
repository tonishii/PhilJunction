import "@/styles/component-styles.css";

import { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { IBuffer } from "@/models/postType";

export default function ImageCarousel({
  images,
  maxImages,
}: {
  images: IBuffer[];
  maxImages: number;
}) {
  const [imageURLS, setImageURLS] = useState<string[]>([]);
  const [imageElements, setImages] = useState<JSX.Element[]>([]);
  const [currImageIndex, setImageIndex] = useState(0);
  const totalImages = images.length;

  function handleNextImage() {
    setImageIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1
    );
  }

  function handlePrevImage() {
    setImageIndex((prevIndex) =>
      prevIndex === totalImages - 1 ? 0 : prevIndex + 1
    );
  }

  function getNextImages(images: JSX.Element[], currentInd: number) {
    if (totalImages === 0) return [];

    return Array.from(
      { length: Math.min(maxImages, totalImages) },
      (_, i) => images[(currentInd + i) % totalImages]
    );
  }

  useEffect(() => {
    setImageURLS(images.map((image): string => {
      const blob = new Blob([image.data], { type: image.contentType });
      return URL.createObjectURL(blob);
    }));

    setImages(imageURLS.map((url, i) => {
      return (
        <img
          src={url}
          key={url + i}
          alt={`post image ${i}`}
          className="post-image" />
      );
    }));
  }, [images]);

  const imagesToShow = getNextImages(imageElements, currImageIndex);

  return (
    <div className="image-carousel">
      {totalImages > 2 && (
        <button className="image-button" onClick={handlePrevImage}>
          <ChevronLeft />
        </button>
      )}

      {imagesToShow}

      {totalImages > 2 && (
        <button className="image-button" onClick={handleNextImage}>
          <ChevronRight />
        </button>
      )}
    </div>
  );
}
