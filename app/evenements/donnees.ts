export type MediaItem = {
  id: string;
  type: "image" | "video";
  src: string;          // chemin relatif depuis /public (ex: /medias/2025/photo1.jpg)
  alt?: string;
  titre?: string;       // affiché sous la vignette et dans le lightbox
  texte?: string;       // petite légende/valeurs FELR
};

export const mediasParAnnee: Record<"2025" | "2024", MediaItem[]> = {
  "2025": [
    {
      id: "25-img-1",
      type: "image",
      src: "/medias/2025/groupe-bord-de-mer.jpg",
      alt: "Photo de groupe au bord de mer",
      titre: "OSEZ",
      texte: "S’écouter, se lancer, se dépasser ensemble.",
    },
    {
      id: "25-vid-1",
      type: "video",
      src: "/medias/2025/teaser-atelier.mp4",
      titre: "TENTEZ",
      texte: "Essayer, rater, apprendre, réussir — en communauté.",
    },
    {
      id: "25-img-2",
      type: "image",
      src: "/medias/2025/atelier-partage.jpg",
      titre: "APPRENEZ",
      texte: "Transmettre, partager, faire grandir.",
    },
    // ➕ Ajoute autant d’objets que tu veux…
  ],
  "2024": [
    {
      id: "24-img-1",
      type: "image",
      src: "/medias/2024/lancement.jpg",
      alt: "Cérémonie de lancement 2024",
      titre: "Lancement",
      texte: "Un départ porté par l’audace et la solidarité.",
    },
    {
      id: "24-vid-1",
      type: "video",
      src: "/medias/2024/interview.mp4",
      titre: "Témoignage",
      texte: "Des parcours, des voix, une force collective.",
    },
  ],
};
