import "@/styles/component-styles.css";

import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function ImageCarousel({
  images,
}: {
  images: string[]
}) {
  const [currImageIndex, setImageIndex] = useState(0);
  const totalImages = images.length;

  function handleNextImage() {
    setImageIndex(prevIndex => (prevIndex === 0 ? totalImages - 1 : prevIndex - 1));
  }

  function handlePrevImage() {
    setImageIndex(prevIndex => (prevIndex === totalImages - 1 ? 0 : prevIndex + 1));
  }

  function getNextImages(images: JSX.Element[], currentInd: number) {
    if (totalImages === 0) return [];

    return Array.from({ length: Math.min(3, totalImages) }, (_, i) =>
      images[(currentInd + i) % totalImages]
    );

  }

  const imageElements: JSX.Element[] = images.map(imagePath => <img src={imagePath} alt="post image" className="post-image" />)
  const imagesToShow = getNextImages(imageElements, currImageIndex);

  return (
    <div className="image-carousel">
      {totalImages > 2 && <button className="image-button" onClick={handlePrevImage}>
        <ChevronLeft />
      </button>}

      {imagesToShow}

      {totalImages > 2 && <button className="image-button" onClick={handleNextImage}>
        <ChevronRight />
      </button>}
    </div>
  );
}