declare module "react-image-gallery" {
  import { Component } from "react";

  interface ImageGalleryItem {
    original: string;
    thumbnail: string;
    description?: string;
    originalClass?: string;
    thumbnailClass?: string;
    renderItem?: () => JSX.Element;
    renderThumbInner?: () => JSX.Element;
  }

  interface ImageGalleryProps {
    items: ImageGalleryItem[];
    autoPlay?: boolean;
    slideInterval?: number;
    showThumbnails?: boolean;
    showFullscreenButton?: boolean;
    showPlayButton?: boolean;
    showBullets?: boolean;
    onSlide?: (currentIndex: number) => void;
    onThumbnailClick?: (event: React.MouseEvent, index: number) => void;
  }

  export default class ImageGallery extends Component<ImageGalleryProps> {}
}
