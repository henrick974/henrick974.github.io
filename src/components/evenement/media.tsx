"use client";

import Image from "next/image";

// Type partagé
export type Media = {
  id: string;
  type: "image" | "video";
  src: string;
  alt?: string;
  titre?: string;
  texte?: string;
  tags?: string[];
};

/* =========================================================
   RENDUS MEDIA
   ========================================================= */
export function MediaPreview({
  m,
  ratio = "aspect-[4/3]",
  hoverZoom = false,
}: {
  m: Media;
  ratio?: string;
  hoverZoom?: boolean;
}) {
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
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
        />
      )}
    </div>
  );
}

export function MediaView({ m }: { m: Media }) {
  if (m.type === "image") {
    return (
      <Image
        src={m.src}
        alt={m.alt ?? m.titre ?? "image"}
        width={2000}
        height={1500}
        className="w-full h-auto object-contain bg-black"
        priority
      />
    );
  }
  return (
    <video
      src={m.src}
      controls
      autoPlay
      className="w-full h-auto object-contain bg-black"
    />
  );
}
