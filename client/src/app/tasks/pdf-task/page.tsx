"use client";

import Iconify from "@/components/iconify";
import { Box, Button, Icon, IconButton } from "@mui/material";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const IMAGES = [
  "/pdf-task/img1.jpeg",
  "/pdf-task/img2.jpeg",
  "/pdf-task/img3.jpeg",
  "/pdf-task/img4.jpeg",
]; // replace with actual URLs or props

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

export default function CatalogViewer() {
  const [index, setIndex] = useState(0);
  const [isSlideshow, setIsSlideshow] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const next = () => setIndex((prev) => (prev + 1) % IMAGES.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
  const goTo = (i: number) => setIndex(i);

  useEffect(() => {
    if (isSlideshow) {
      timerRef.current = setInterval(next, 3000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSlideshow]);

  const handleThumbClick = (i: number) => {
    goTo(i);
    if (isSlideshow) {
      clearInterval(timerRef.current!);
      timerRef.current = setInterval(
        () => setIndex((prev) => (prev + 1) % IMAGES.length),
        3000,
      );
    }
  };

  return (
    <Box
      width={"100%"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          p: 2,
        }}
      >
        <Box
          sx={{
            m: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image src={IMAGES[index]} width={500} height={400} alt="Main View" />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            sx={{
              fontSize: "50px",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              border: "2px solid gray",
            }}
          >
            <Iconify
              onClick={prev}
              icon="solar:arrow-left-outline"
              width="50"
              height="50"
            />
          </IconButton>
          {IMAGES.map((img, i) => (
            <Button
              key={i}
              data-testid={`thumb-button-${i}`}
              className={`thumb-button ${i === index ? "active" : ""}`}
              onClick={() => handleThumbClick(i)}
            >
              <Image
                style={{
                  border: i === index ? "3px solid #000" : "none",
                  padding: 5,
                }}
                src={img}
                width={120}
                height={100}
                alt={`Thumb ${i}`}
              />
            </Button>
          ))}

          <IconButton
            sx={{
              fontSize: "50px",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              border: "2px solid gray",
            }}
          >
            <Iconify
              onClick={next}
              icon="solar:arrow-right-outline"
              width="50"
              height="50"
            />
          </IconButton>
        </Box>
        <label>
          <input
            type="checkbox"
            checked={isSlideshow}
            onChange={(e) => setIsSlideshow(e.target.checked)}
          />
          Start Slide Show
        </label>
      </Box>
      <ImageGallery autoPlay={true} slideInterval={3000} items={images} />
    </Box>
  );
}
