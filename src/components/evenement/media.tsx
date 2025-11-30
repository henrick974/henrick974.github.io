"use client";

import Image from "next/image";

// Type partagé pour toutes les années / carrousels
export type Media = {
  id: string;
  type: "image" | "video";
  src: string;
  alt?: string;
  titre?: string;
  texte?: string;
  tags?: string[];
};

type MediaPreviewProps = {
  m: Media;
  ratio?: string;
  hoverZoom?: boolean;
};

export function MediaPreview({
  m,
  ratio = "aspect-[4/3]",
  hoverZoom = false,
}: MediaPreviewProps) {
  return (
    <div className={`relative ${ratio} bg-gray-100`}>
      {m.type === "image" ? (
        <Image
          src={m.src}
          alt={m.alt ?? m.titre ?? "image"}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className={`object-contain ${
            hoverZoom
              ? "transition-transform duration-300 group-hover:scale-[1.02]"
              : ""
          }`}
        />
      ) : (
        <video
          src={m.src}
          data-autoscroll-video="true"
          autoPlay
          muted
          playsInline
          preload="metadata"
          controls
          className="absolute inset-0 w-full h-full object-contain bg-black"
          onLoadedMetadata={(e) => {
            const v = e.currentTarget as HTMLVideoElement;
            v.currentTime = 0;
            v.play().catch(() => {});
          }}
          onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
          onMouseLeave={(e) => {
            const v = e.currentTarget as HTMLVideoElement;
            v.pause();
            v.currentTime = 0;
          }}
        />
      )}
    </div>
  );
}
