"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/* =========================================================
   TYPES
   ========================================================= */
type Media = {
  id: string;
  type: "image" | "video";
  src: string; // ex: "/medias/2025/evenement1.jpg"
  alt?: string;
  titre?: string; // ex: "Ouverture 2025"
  texte?: string; // ex: "Soirée d’ouverture au Parc des Expos"
  tags?: string[]; // ex: ["ouverture", "ceremonie"]
};

type YearData = {
  hero: { titre: string; accroche: string };
  chiffres: { label: string; valeur: number }[]; // uniquement lié aux ÉVÈNEMENTS
  momentsForts: Media[]; // carrousel
  galerie: Media[]; // masonry + filtres
};

/* =========================================================
   DONNÉES COMMUNES (2024 & 2023)
   ========================================================= */
const MEDIAS_2024: Media[] = [
  // Tu peux garder ou enlever les anciens éléments au-dessus si tu en as

  // -------- Fichiers 1 à 26 --------
  {
    id: "24-img-1",
    type: "image",
    src: "/medias/2024/1.jpeg",
    titre: "Souvenir 2024 #1",
    tags: ["2024"],
  },
  {
    id: "24-img-2",
    type: "image",
    src: "/medias/2024/2.jpg",
    titre: "Souvenir 2024 #2",
    tags: ["2024"],
  },
  {
    id: "24-img-3",
    type: "image",
    src: "/medias/2024/4.jpg",
    titre: "Souvenir 2024 #3",
    tags: ["2024"],
  },
  {
    id: "24-img-4",
    type: "image",
    src: "/medias/2024/5.jpg",
    titre: "Souvenir 2024 #4",
    tags: ["2024"],
  },
  {
    id: "24-img-5",
    type: "image",
    src: "/medias/2024/6.jpg",
    titre: "Souvenir 2024 #5",
    tags: ["2024"],
  },
  {
    id: "24-img-6",
    type: "image",
    src: "/medias/2024/7.png",
    titre: "Souvenir 2024 #6",
    tags: ["2024"],
  },
  {
    id: "24-img-7",
    type: "image",
    src: "/medias/2024/8.jpg",
    titre: "Souvenir 2024 #7",
    tags: ["2024"],
  },
  {
    id: "24-img-8",
    type: "image",
    src: "/medias/2024/9.jpg",
    titre: "Souvenir 2024 #8",
    tags: ["2024"],
  },
  {
    id: "24-img-9",
    type: "image",
    src: "/medias/2024/10.JPG",
    titre: "Souvenir 2024 #9",
    tags: ["2024"],
  },
  {
    id: "24-img-10",
    type: "image",
    src: "/medias/2024/11.JPG",
    titre: "Souvenir 2024 #10",
    tags: ["2024"],
  },
  {
    id: "24-img-11",
    type: "image",
    src: "/medias/2024/12.jpg",
    titre: "Souvenir 2024 #11",
    tags: ["2024"],
  },
  {
    id: "24-img-12",
    type: "image",
    src: "/medias/2024/13.jpg",
    titre: "Souvenir 2024 #12",
    tags: ["2024"],
  },
  {
    id: "24-img-13",
    type: "image",
    src: "/medias/2024/14.jpg",
    titre: "Souvenir 2024 #13",
    tags: ["2024"],
  },
  {
    id: "24-img-14",
    type: "image",
    src: "/medias/2024/15.jpg",
    titre: "Souvenir 2024 #14",
    tags: ["2024"],
  },
  {
    id: "24-img-15",
    type: "image",
    src: "/medias/2024/16.jpg",
    titre: "Souvenir 2024 #15",
    tags: ["2024"],
  },
  {
    id: "24-img-16",
    type: "image",
    src: "/medias/2024/17.jpg",
    titre: "Souvenir 2024 #16",
    tags: ["2024"],
  },
  {
    id: "24-img-17",
    type: "image",
    src: "/medias/2024/18.jpg",
    titre: "Souvenir 2024 #17",
    tags: ["2024"],
  },
  {
    id: "24-img-18",
    type: "image",
    src: "/medias/2024/19.jpg",
    titre: "Souvenir 2024 #18",
    tags: ["2024"],
  },
  {
    id: "24-img-19",
    type: "image",
    src: "/medias/2024/20.jpg",
    titre: "Souvenir 2024 #19",
    tags: ["2024"],
  },
  {
    id: "24-img-20",
    type: "image",
    src: "/medias/2024/21.jpg",
    titre: "Souvenir 2024 #20",
    tags: ["2024"],
  },
  {
    id: "24-img-21",
    type: "image",
    src: "/medias/2024/22.jpg",
    titre: "Souvenir 2024 #21",
    tags: ["2024"],
  },
  {
    id: "24-img-22",
    type: "image",
    src: "/medias/2024/23.jpg",
    titre: "Souvenir 2024 #22",
    tags: ["2024"],
  },
  {
    id: "24-img-23",
    type: "image",
    src: "/medias/2024/24.jpg",
    titre: "Souvenir 2024 #23",
    tags: ["2024"],
  },
  {
    id: "24-img-24",
    type: "image",
    src: "/medias/2024/25.jpg",
    titre: "Souvenir 2024 #24",
    tags: ["2024"],
  },
  {
    id: "24-img-25",
    type: "image",
    src: "/medias/2024/26.jpg",
    titre: "Souvenir 2024 #25",
    tags: ["2024"],
  },

  // -------- 27 à 53 copy --------
  {
    id: "24-img-26",
    type: "image",
    src: "/medias/2024/27.jpg",
    titre: "Souvenir 2024 #26",
    tags: ["2024"],
  },
  {
    id: "24-img-27",
    type: "image",
    src: "/medias/2024/28.JPG",
    titre: "Souvenir 2024 #27",
    tags: ["2024"],
  },
  {
    id: "24-img-28",
    type: "image",
    src: "/medias/2024/29.JPG",
    titre: "Souvenir 2024 #28",
    tags: ["2024"],
  },
  {
    id: "24-img-29",
    type: "image",
    src: "/medias/2024/30.JPG",
    titre: "Souvenir 2024 #29",
    tags: ["2024"],
  },
  {
    id: "24-img-30",
    type: "image",
    src: "/medias/2024/31.JPG",
    titre: "Souvenir 2024 #30",
    tags: ["2024"],
  },
  {
    id: "24-img-31",
    type: "image",
    src: "/medias/2024/32.JPG",
    titre: "Souvenir 2024 #31",
    tags: ["2024"],
  },
  {
    id: "24-img-32",
    type: "image",
    src: "/medias/2024/33.JPG",
    titre: "Souvenir 2024 #32",
    tags: ["2024"],
  },
  {
    id: "24-img-33",
    type: "image",
    src: "/medias/2024/35.JPG",
    titre: "Souvenir 2024 #33",
    tags: ["2024"],
  },
  {
    id: "24-img-34",
    type: "image",
    src: "/medias/2024/36.jpg",
    titre: "Souvenir 2024 #34",
    tags: ["2024"],
  },
  {
    id: "24-img-35",
    type: "image",
    src: "/medias/2024/37.jpg",
    titre: "Souvenir 2024 #35",
    tags: ["2024"],
  },
  {
    id: "24-img-36",
    type: "image",
    src: "/medias/2024/38.jpg",
    titre: "Souvenir 2024 #36",
    tags: ["2024"],
  },
  {
    id: "24-img-37",
    type: "image",
    src: "/medias/2024/39.JPG",
    titre: "Souvenir 2024 #37",
    tags: ["2024"],
  },
  {
    id: "24-img-38",
    type: "image",
    src: "/medias/2024/40.JPG",
    titre: "Souvenir 2024 #38",
    tags: ["2024"],
  },
  {
    id: "24-img-39",
    type: "image",
    src: "/medias/2024/41.JPG",
    titre: "Souvenir 2024 #39",
    tags: ["2024"],
  },
  {
    id: "24-img-40",
    type: "image",
    src: "/medias/2024/42.JPG",
    titre: "Souvenir 2024 #40",
    tags: ["2024"],
  },
  {
    id: "24-img-41",
    type: "image",
    src: "/medias/2024/43.JPG",
    titre: "Souvenir 2024 #41",
    tags: ["2024"],
  },
  {
    id: "24-img-42",
    type: "image",
    src: "/medias/2024/44.JPG",
    titre: "Souvenir 2024 #42",
    tags: ["2024"],
  },
  {
    id: "24-img-43",
    type: "image",
    src: "/medias/2024/45.JPG",
    titre: "Souvenir 2024 #43",
    tags: ["2024"],
  },
  {
    id: "24-img-44",
    type: "image",
    src: "/medias/2024/46.JPG",
    titre: "Souvenir 2024 #44",
    tags: ["2024"],
  },
  {
    id: "24-img-45",
    type: "image",
    src: "/medias/2024/47.JPG",
    titre: "Souvenir 2024 #45",
    tags: ["2024"],
  },
  {
    id: "24-img-46",
    type: "image",
    src: "/medias/2024/48.JPG",
    titre: "Souvenir 2024 #46",
    tags: ["2024"],
  },
  {
    id: "24-img-47",
    type: "image",
    src: "/medias/2024/49.JPG",
    titre: "Souvenir 2024 #47",
    tags: ["2024"],
  },
  {
    id: "24-img-48",
    type: "image",
    src: "/medias/2024/50.JPG",
    titre: "Souvenir 2024 #48",
    tags: ["2024"],
  },
  {
    id: "24-img-49",
    type: "image",
    src: "/medias/2024/51.JPG",
    titre: "Souvenir 2024 #49",
    tags: ["2024"],
  },
  {
    id: "24-img-50",
    type: "image",
    src: "/medias/2024/52.JPG",
    titre: "Souvenir 2024 #50",
    tags: ["2024"],
  },
  {
    id: "24-img-51",
    type: "image",
    src: "/medias/2024/53 copy.jpg",
    titre: "Souvenir 2024 #51",
    tags: ["2024"],
  },

  // -------- 54 à 75 + fichiers divers --------
  {
    id: "24-img-52",
    type: "image",
    src: "/medias/2024/54.jpg",
    titre: "Souvenir 2024 #52",
    tags: ["2024"],
  },
  {
    id: "24-img-53",
    type: "image",
    src: "/medias/2024/55.jpg",
    titre: "Souvenir 2024 #53",
    tags: ["2024"],
  },
  {
    id: "24-img-54",
    type: "image",
    src: "/medias/2024/56.jpg",
    titre: "Souvenir 2024 #54",
    tags: ["2024"],
  },
  {
    id: "24-img-55",
    type: "image",
    src: "/medias/2024/57.jpg",
    titre: "Souvenir 2024 #55",
    tags: ["2024"],
  },
  {
    id: "24-img-56",
    type: "image",
    src: "/medias/2024/58.jpg",
    titre: "Souvenir 2024 #56",
    tags: ["2024"],
  },
  {
    id: "24-img-57",
    type: "image",
    src: "/medias/2024/59.jpg",
    titre: "Souvenir 2024 #57",
    tags: ["2024"],
  },
  {
    id: "24-img-58",
    type: "image",
    src: "/medias/2024/60.jpg",
    titre: "Souvenir 2024 #58",
    tags: ["2024"],
  },
  {
    id: "24-img-59",
    type: "image",
    src: "/medias/2024/61.jpg",
    titre: "Souvenir 2024 #59",
    tags: ["2024"],
  },
  {
    id: "24-img-60",
    type: "image",
    src: "/medias/2024/62.jpg",
    titre: "Souvenir 2024 #60",
    tags: ["2024"],
  },
  {
    id: "24-img-61",
    type: "image",
    src: "/medias/2024/63.jpg",
    titre: "Souvenir 2024 #61",
    tags: ["2024"],
  },
  {
    id: "24-img-62",
    type: "image",
    src: "/medias/2024/64.jpg",
    titre: "Souvenir 2024 #62",
    tags: ["2024"],
  },
  {
    id: "24-img-63",
    type: "image",
    src: "/medias/2024/65.jpg",
    titre: "Souvenir 2024 #63",
    tags: ["2024"],
  },
  {
    id: "24-img-64",
    type: "image",
    src: "/medias/2024/66.jpg",
    titre: "Souvenir 2024 #64",
    tags: ["2024"],
  },
  {
    id: "24-img-65",
    type: "image",
    src: "/medias/2024/67.jpg",
    titre: "Souvenir 2024 #65",
    tags: ["2024"],
  },
  {
    id: "24-img-66",
    type: "image",
    src: "/medias/2024/68.jpg",
    titre: "Souvenir 2024 #66",
    tags: ["2024"],
  },
  {
    id: "24-img-67",
    type: "image",
    src: "/medias/2024/69.jpg",
    titre: "Souvenir 2024 #67",
    tags: ["2024"],
  },
  {
    id: "24-img-68",
    type: "image",
    src: "/medias/2024/70.jpg",
    titre: "Souvenir 2024 #68",
    tags: ["2024"],
  },
  {
    id: "24-img-69",
    type: "image",
    src: "/medias/2024/71.jpg",
    titre: "Souvenir 2024 #69",
    tags: ["2024"],
  },
  {
    id: "24-img-70",
    type: "image",
    src: "/medias/2024/72.jpg",
    titre: "Souvenir 2024 #70",
    tags: ["2024"],
  },
  {
    id: "24-img-71",
    type: "image",
    src: "/medias/2024/73.JPG",
    titre: "Souvenir 2024 #71",
    tags: ["2024"],
  },
  {
    id: "24-img-72",
    type: "image",
    src: "/medias/2024/74.JPG",
    titre: "Souvenir 2024 #72",
    tags: ["2024"],
  },
  {
    id: "24-img-73",
    type: "image",
    src: "/medias/2024/75.JPG",
    titre: "Souvenir 2024 #73",
    tags: ["2024"],
  },
  {
    id: "24-img-74",
    type: "image",
    src: "/medias/2024/780d2047-050a-460d-9d22-84e4188d6212.JPG",
    titre: "Souvenir 2024 #74",
    tags: ["2024"],
  },
  {
    id: "24-img-75",
    type: "image",
    src: "/medias/2024/20240320_181836 copie.jpg",
    titre: "Souvenir 2024 #75",
    tags: ["2024"],
  },
  {
    id: "24-img-76",
    type: "image",
    src: "/medias/2024/Capture d’écran 2024-04-03 à 13.38.40.jpg",
    titre: "Souvenir 2024 #76",
    tags: ["2024"],
  },
  {
    id: "24-img-77",
    type: "image",
    src: "/medias/2024/Capture d’écran 2024-04-24 à 18.44.08.jpg",
    titre: "Souvenir 2024 #77",
    tags: ["2024"],
  },
  {
    id: "24-img-78",
    type: "image",
    src: "/medias/2024/Gala-3.jpg",
    titre: "Soirée de gala #3",
    tags: ["2024", "gala"],
  },

  // -------- Série Gala + quelques IMG_ --------
  {
    id: "24-img-79",
    type: "image",
    src: "/medias/2024/Gala-4.jpg",
    titre: "Soirée de gala #4",
    tags: ["2024", "gala"],
  },
  {
    id: "24-img-80",
    type: "image",
    src: "/medias/2024/Gala-5.jpg",
    titre: "Soirée de gala #5",
    tags: ["2024", "gala"],
  },
  {
    id: "24-img-81",
    type: "image",
    src: "/medias/2024/Gala-6.jpg",
    titre: "Soirée de gala #6",
    tags: ["2024", "gala"],
  },
  {
    id: "24-img-82",
    type: "image",
    src: "/medias/2024/Gala-7.jpg",
    titre: "Soirée de gala #7",
    tags: ["2024", "gala"],
  },
  {
    id: "24-img-83",
    type: "image",
    src: "/medias/2024/Gala-8.jpg",
    titre: "Soirée de gala #8",
    tags: ["2024", "gala"],
  },
  {
    id: "24-img-84",
    type: "image",
    src: "/medias/2024/Gala-9.jpg",
    titre: "Soirée de gala #9",
    tags: ["2024", "gala"],
  },
  {
    id: "24-img-85",
    type: "image",
    src: "/medias/2024/Gala-10.jpg",
    titre: "Soirée de gala #10",
    tags: ["2024", "gala"],
  },
  {
    id: "24-img-86",
    type: "image",
    src: "/medias/2024/Gala-11.jpg",
    titre: "Soirée de gala #11",
    tags: ["2024", "gala"],
  },
  {
    id: "24-img-87",
    type: "image",
    src: "/medias/2024/Gala-12.jpg",
    titre: "Soirée de gala #12",
    tags: ["2024", "gala"],
  },
  {
    id: "24-img-88",
    type: "image",
    src: "/medias/2024/Gala-13.jpg",
    titre: "Soirée de gala #13",
    tags: ["2024", "gala"],
  },
  {
    id: "24-img-89",
    type: "image",
    src: "/medias/2024/Gala-14.jpg",
    titre: "Soirée de gala #14",
    tags: ["2024", "gala"],
  },
  {
    id: "24-img-90",
    type: "image",
    src: "/medias/2024/Gala-15.jpg",
    titre: "Soirée de gala #15",
    tags: ["2024", "gala"],
  },
  {
    id: "24-img-91",
    type: "image",
    src: "/medias/2024/Gala-18.jpg",
    titre: "Soirée de gala #18",
    tags: ["2024", "gala"],
  },
  {
    id: "24-img-92",
    type: "image",
    src: "/medias/2024/Gala-39.jpg",
    titre: "Soirée de gala #39",
    tags: ["2024", "gala"],
  },
  {
    id: "24-img-93",
    type: "image",
    src: "/medias/2024/Gala-44.jpg",
    titre: "Soirée de gala #44",
    tags: ["2024", "gala"],
  },
  {
    id: "24-img-94",
    type: "image",
    src: "/medias/2024/Gala-121.jpg",
    titre: "Soirée de gala #121",
    tags: ["2024", "gala"],
  },
  {
    id: "24-img-95",
    type: "image",
    src: "/medias/2024/Gala-122 copie.jpg",
    titre: "Soirée de gala #122",
    tags: ["2024", "gala"],
  },
  {
    id: "24-img-96",
    type: "image",
    src: "/medias/2024/Gala-128.jpg",
    titre: "Soirée de gala #128",
    tags: ["2024", "gala"],
  },
  {
    id: "24-img-97",
    type: "image",
    src: "/medias/2024/Gala-130.jpg",
    titre: "Soirée de gala #130",
    tags: ["2024", "gala"],
  },
  {
    id: "24-img-98",
    type: "image",
    src: "/medias/2024/Gala-147.jpg",
    titre: "Soirée de gala #147",
    tags: ["2024", "gala"],
  },
  {
    id: "24-img-99",
    type: "image",
    src: "/medias/2024/Gala-153.jpg",
    titre: "Soirée de gala #153",
    tags: ["2024", "gala"],
  },
  {
    id: "24-img-100",
    type: "image",
    src: "/medias/2024/Gala-161.jpg",
    titre: "Soirée de gala #161",
    tags: ["2024", "gala"],
  },
  {
    id: "24-img-101",
    type: "image",
    src: "/medias/2024/Gala-166.jpg",
    titre: "Soirée de gala #166",
    tags: ["2024", "gala"],
  },
  {
    id: "24-img-102",
    type: "image",
    src: "/medias/2024/Gala-179.jpg",
    titre: "Soirée de gala #179",
    tags: ["2024", "gala"],
  },
  {
    id: "24-img-103",
    type: "image",
    src: "/medias/2024/IMG_0013.jpeg",
    titre: "Souvenir 2024 #78",
    tags: ["2024"],
  },
  {
    id: "24-img-104",
    type: "image",
    src: "/medias/2024/IMG_0022.jpeg",
    titre: "Souvenir 2024 #79",
    tags: ["2024"],
  },
  {
    id: "24-img-105",
    type: "image",
    src: "/medias/2024/IMG_0034.jpeg",
    titre: "Souvenir 2024 #80",
    tags: ["2024"],
  },

  // -------- Série IMG_* --------
  {
    id: "24-img-106",
    type: "image",
    src: "/medias/2024/IMG_0150.jpeg",
    titre: "Souvenir 2024 #81",
    tags: ["2024"],
  },
  {
    id: "24-img-107",
    type: "image",
    src: "/medias/2024/IMG_0195.jpeg",
    titre: "Souvenir 2024 #82",
    tags: ["2024"],
  },
  {
    id: "24-img-108",
    type: "image",
    src: "/medias/2024/IMG_1139.jpeg",
    titre: "Souvenir 2024 #83",
    tags: ["2024"],
  },
  {
    id: "24-img-109",
    type: "image",
    src: "/medias/2024/IMG_4578.jpeg",
    titre: "Souvenir 2024 #84",
    tags: ["2024"],
  },
  {
    id: "24-img-110",
    type: "image",
    src: "/medias/2024/IMG_4585.jpeg",
    titre: "Souvenir 2024 #85",
    tags: ["2024"],
  },
  {
    id: "24-img-111",
    type: "image",
    src: "/medias/2024/IMG_4586.jpeg",
    titre: "Souvenir 2024 #86",
    tags: ["2024"],
  },
  {
    id: "24-img-112",
    type: "image",
    src: "/medias/2024/IMG_4592.jpeg",
    titre: "Souvenir 2024 #87",
    tags: ["2024"],
  },
  {
    id: "24-img-113",
    type: "image",
    src: "/medias/2024/IMG_4615.jpeg",
    titre: "Souvenir 2024 #88",
    tags: ["2024"],
  },
  {
    id: "24-img-114",
    type: "image",
    src: "/medias/2024/IMG_9025.jpeg",
    titre: "Souvenir 2024 #89",
    tags: ["2024"],
  },
  {
    id: "24-img-115",
    type: "image",
    src: "/medias/2024/IMG_9034.jpeg",
    titre: "Souvenir 2024 #90",
    tags: ["2024"],
  },
  {
    id: "24-img-116",
    type: "image",
    src: "/medias/2024/IMG_9046.jpeg",
    titre: "Souvenir 2024 #91",
    tags: ["2024"],
  },
  {
    id: "24-img-117",
    type: "image",
    src: "/medias/2024/IMG_9055.jpeg",
    titre: "Souvenir 2024 #92",
    tags: ["2024"],
  },
  {
    id: "24-img-118",
    type: "image",
    src: "/medias/2024/IMG_9077.jpeg",
    titre: "Souvenir 2024 #93",
    tags: ["2024"],
  },
  {
    id: "24-img-119",
    type: "image",
    src: "/medias/2024/IMG_9090.jpeg",
    titre: "Souvenir 2024 #94",
    tags: ["2024"],
  },
  {
    id: "24-img-120",
    type: "image",
    src: "/medias/2024/IMG_9100.JPG",
    titre: "Souvenir 2024 #95",
    tags: ["2024"],
  },
  {
    id: "24-img-121",
    type: "image",
    src: "/medias/2024/IMG_9120.JPG",
    titre: "Souvenir 2024 #96",
    tags: ["2024"],
  },
  {
    id: "24-img-122",
    type: "image",
    src: "/medias/2024/IMG_9130.jpeg",
    titre: "Souvenir 2024 #97",
    tags: ["2024"],
  },
  {
    id: "24-img-123",
    type: "image",
    src: "/medias/2024/IMG_9227.jpeg",
    titre: "Souvenir 2024 #98",
    tags: ["2024"],
  },
  {
    id: "24-img-124",
    type: "image",
    src: "/medias/2024/IMG_9280.jpeg",
    titre: "Souvenir 2024 #99",
    tags: ["2024"],
  },
  {
    id: "24-img-125",
    type: "image",
    src: "/medias/2024/IMG_9321.jpeg",
    titre: "Souvenir 2024 #100",
    tags: ["2024"],
  },
  {
    id: "24-img-126",
    type: "image",
    src: "/medias/2024/IMG_9328.jpeg",
    titre: "Souvenir 2024 #101",
    tags: ["2024"],
  },
  {
    id: "24-img-127",
    type: "image",
    src: "/medias/2024/IMG_9349.jpeg",
    titre: "Souvenir 2024 #102",
    tags: ["2024"],
  },

  // -------- Photos "Photo Gala" --------
  {
    id: "24-img-128",
    type: "image",
    src: "/medias/2024/Photo Gala 32.jpg",
    titre: "Photo gala 32",
    tags: ["2024", "gala"],
  },
  {
    id: "24-img-129",
    type: "image",
    src: "/medias/2024/Photo Gala 33.jpg",
    titre: "Photo gala 33",
    tags: ["2024", "gala"],
  },
  {
    id: "24-img-130",
    type: "image",
    src: "/medias/2024/Photo Gala 43.jpg",
    titre: "Photo gala 43",
    tags: ["2024", "gala"],
  },
  {
    id: "24-img-131",
    type: "image",
    src: "/medias/2024/Photo Gala 55.jpg",
    titre: "Photo gala 55",
    tags: ["2024", "gala"],
  },
];




const MEDIAS_2023: Media[] = [
  {
    id: "23-m1",
    type: "image",
    src: "/medias/2023/1.jpeg", // <= fichier placé dans public/medias/2023/1.jpeg
    titre: "Premiers pas",
    texte: "Une équipe, une vision, un public curieux.",
    tags: ["lancement"],
  },
  {
    id: "23-m2",
    type: "video",
    src: "/medias/2023/teaser.mp4",
    titre: "Teaser 2023",
    texte: "Un format court pour poser l’intention.",
    tags: ["teaser"],
  },
  {
    id: "23-m3",
    type: "image",
    src: "/medias/2023/rencontre.jpg",
    titre: "Rencontre locale",
    texte: "Échanges directs et retours à chaud.",
    tags: ["rencontre"],
  },
  {
    id: "23-g1",
    type: "image",
    src: "/medias/2023/affiche.jpg",
    titre: "Affiche 2023",
    texte: "Première identité, premiers codes visuels.",
    tags: ["affiche"],
  },
  {
    id: "23-g2",
    type: "image",
    src: "/medias/2023/installation.jpg",
    titre: "Installation",
    texte: "Montage simple et efficace.",
    tags: ["logistique"],
  },
  {
    id: "23-g3",
    type: "video",
    src: "/medias/2023/highlights.mp4",
    titre: "Highlights 2023",
    texte: "Un condensé des temps forts.",
    tags: ["highlights"],
  },
  {
    id: "23-g4",
    type: "image",
    src: "/medias/2023/ambiance.jpg",
    titre: "Ambiance",
    texte: "Convivialité et proximité.",
    tags: ["soiree"],
  },
];

/* =========================================================
   DONNÉES
   ========================================================= */
const DATA: Record<"2025" | "2024" | "2023", YearData> = {
  "2025": {
    hero: {
      titre: "Notre Histoire en 2025",
      accroche:
        "Atelier, Cérémonies, conférences, rencontres publiques, soirées de prestige : Une association rythmée par des évènements marquants.",
    },
    chiffres: [
      { label: "Ateliers", valeur: 179 },
      { label: "Membres", valeur: 106 },
      { label: "Soutien et Partenaires", valeur: 21 },
    ],

    /* MOMENTS FORTS — carrousel */
    momentsForts: [
      {
        id: "25-m1",
        type: "image",
        src: "/medias/2025/ouverture.jpg",
        titre: "Cérémonie d’ouverture",
        texte: "Rideau levé, annonces majeures et lancement officiel.",
        tags: ["ouverture", "ceremonie"],
      },
      {
        id: "25-m2",
        type: "video",
        src: "/medias/2025/point-presse.mp4",
        titre: "Point presse",
        texte: "Calendrier dévoilé et temps forts présentés à la presse.",
        tags: ["presse"],
      },
      {
        id: "25-m3",
        type: "image",
        src: "/medias/2025/conference.jpg",
        titre: "Conférence inaugurale",
        texte: "Une vision claire et un cap assumé pour l’année.",
        tags: ["conference"],
      },
      {
        id: "25-m4",
        type: "image",
        src: "/medias/2025/rencontre-publique.jpg",
        titre: "Rencontre publique",
        texte: "Échanges en salle et annonces complémentaires.",
        tags: ["rencontre"],
      },
      {
        id: "25-m5",
        type: "video",
        src: "/medias/2025/highlights-early.mp4",
        titre: "Highlights — 1er trimestre",
        texte: "Un condensé d’émotion et d’intensité.",
        tags: ["highlights"],
      },
      {
        id: "25-m6",
        type: "image",
        src: "/medias/2025/gala.jpg",
        titre: "Soirée de distinction",
        texte: "Clôture d’étape, mise à l’honneur et moments d’exception.",
        tags: ["gala"],
      },
    ],

    /* GALERIE — masonry + filtres */
    galerie: [
      {
        id: "25-g1",
        type: "image",
        src: "/medias/2025/scene-centrale.jpg",
        titre: "Scène centrale",
        texte: "Lumières, scénographie et ambiance soignée.",
        tags: ["scene", "ceremonie"],
      },
      {
        id: "25-g2",
        type: "image",
        src: "/medias/2025/affluence.jpg",
        titre: "Affluence",
        texte: "Un public au rendez-vous pour les annonces clés.",
        tags: ["rencontre"],
      },
      {
        id: "25-g3",
        type: "video",
        src: "/medias/2025/mini-after.mp4",
        titre: "Aftermovie express",
        texte: "Les temps forts d’une soirée en rythme.",
        tags: ["aftermovie"],
      },
      {
        id: "25-g4",
        type: "image",
        src: "/medias/2025/coulisses.jpg",
        titre: "Coulisses",
        texte: "Réglages, derniers briefings et mise au point technique.",
        tags: ["backstage", "logistique"],
      },
      {
        id: "25-g5",
        type: "image",
        src: "/medias/2025/installation.jpg",
        titre: "Installation",
        texte: "Montage précis pour une expérience fluide et agréable.",
        tags: ["logistique"],
      },
      {
        id: "25-g6",
        type: "video",
        src: "/medias/2025/highlights-2.mp4",
        titre: "Highlights — mi-saison",
        texte: "Nouveau chapitre, nouveaux décors, même intensité.",
        tags: ["highlights"],
      },
      {
        id: "25-g7",
        type: "image",
        src: "/medias/2025/ceremonie.jpg",
        titre: "Cérémonie",
        texte: "Remise de distinctions et annonces intermédiaires.",
        tags: ["ceremonie"],
      },
      {
        id: "25-g8",
        type: "image",
        src: "/medias/2025/exposition.jpg",
        titre: "Espace exposition",
        texte: "Parcours visuel pensé pour guider le regard.",
        tags: ["exposition"],
      },
      {
        id: "25-g9",
        type: "video",
        src: "/medias/2025/spot-annonce.mp4",
        titre: "Spot d’annonce",
        texte: "Prochain rendez-vous à ne pas manquer.",
        tags: ["annonce"],
      },
      {
        id: "25-g10",
        type: "image",
        src: "/medias/2025/soiree.jpg",
        titre: "Soirée signature",
        texte: "Décor épuré, tempo élégant, instants à part.",
        tags: ["soiree"],
      },
      {
        id: "25-g11",
        type: "image",
        src: "/medias/2025/village.jpg",
        titre: "Village éphémère",
        texte: "Parcours libre et découverte au fil des allées.",
        tags: ["exterieur"],
      },
      {
        id: "25-g12",
        type: "video",
        src: "/medias/2025/highlights-final.mp4",
        titre: "Highlights — final",
        texte: "Clôture sur une note forte et lumineuse.",
        tags: ["highlights", "final"],
      },
    ],
  },

  "2024": {
    hero: {
      titre: "Notre histoire en 2024",
      accroche:
        "Premières éditions et premières scènes : les fondations d’un rendez-vous qui compte.",
    },
    chiffres: [
      { label: "Ateliers", valeur: 192 },
      { label: "Membres", valeur: 95 },
      { label: "Soutien et partenaire", valeur: 28 },
    ],

    // Même médias pour "Au coeur de nos actions" et "Galerie"
    momentsForts: MEDIAS_2024,
    galerie: MEDIAS_2024,
  },

  "2023": {
    hero: {
      titre: "Notre histoire en 2023",
      accroche:
        "Les premières pierres : rencontres fondatrices et formats testés grandeur nature.",
    },
    chiffres: [
      { label: "Ateliers", valeur: 15 },
      { label: "Membres", valeur: 17 },
      { label: "Soutien et partenaire", valeur: 5 },
    ],

    // Même médias pour "Au coeur de nos actions" et "Galerie"
    momentsForts: MEDIAS_2023,
    galerie: MEDIAS_2023,
  },
};

/* =========================================================
   OUTILS
   ========================================================= */
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

function useCounter(n: number, duration = 1200) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setV(Math.floor(n * easeOut(p)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [n, duration]);
  return v;
}

/* =========================================================
   PAGE
   ========================================================= */
export default function PageEvenement() {
  const [year, setYear] = useState<"2025" | "2024" | "2023">("2025");
  const data = DATA[year];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fff7ed] to-white">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pt-16 md:pt-24 pb-8 text-center">
        <motion.h1
          key={`h1-${year}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl md:text-6xl font-serif tracking-wide"
        >
          {data.hero.titre}
        </motion.h1>
        <p className="mt-3 text-lg text-gray-700">{data.hero.accroche}</p>

        {/* Switch Année */}
        <div className="mt-8 inline-flex rounded-full border bg-white overflow-hidden shadow">
          {(["2025", "2024", "2023"] as const).map((y) => (
            <button
              key={y}
              onClick={() => setYear(y)}
              className={`px-6 py-2 text-base transition ${
                year === y ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
              aria-pressed={year === y}
            >
              {y}
            </button>
          ))}
        </div>
      </section>

      {/* CHIFFRES CLÉS */}
      <SectionChiffres data={data.chiffres} />

      {/* MOMENTS FORTS */}
      <SectionMomentsForts items={data.momentsForts} />

      {/* GALERIE */}
      <SectionGalerie items={data.galerie} />
    </main>
  );
}

/* =========================================================
   SECTIONS
   ========================================================= */
function SectionChiffres({ data }: { data: { label: string; valeur: number }[] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {data.map((c) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl border bg-white p-6 text-center shadow-sm"
          >
            <div className="text-4xl md:text-5xl font-semibold">{useCounter(c.valeur)}</div>
            <div className="mt-2 text-gray-600">{c.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function SectionMomentsForts({ items }: { items: Media[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <h2 className="text-3xl md:text-4xl font-serif mb-6 text-center">Au coeur de nos actions</h2>
      <div className="relative">
        <div ref={ref} className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2">
          {items.map((m) => (
            <article
              key={m.id}
              className="snap-start shrink-0 w-[85%] md:w-[48%] lg:w-[32%] rounded-2xl overflow-hidden border bg-white shadow-sm"
            >
              <MediaPreview m={m} ratio="aspect-[16/9]" hoverZoom />
              <div className="p-4">
                {m.titre && <h3 className="font-semibold">{m.titre}</h3>}
                {m.texte && <p className="text-sm text-gray-600 mt-1">{m.texte}</p>}
                {m.tags && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {m.tags.map((t) => (
                      <span key={t} className="text-xs rounded-full bg-gray-100 px-2 py-1">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* flèches */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollBy(-1)}
            className="absolute -left-3 top-1/2 -translate-y-1/2 rounded-full bg-white border shadow px-3 py-2"
            aria-label="Précédent"
          >
            ‹
          </button>
          <button
            onClick={() => scrollBy(1)}
            className="absolute -right-3 top-1/2 -translate-y-1/2 rounded-full bg-white border shadow px-3 py-2"
            aria-label="Suivant"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

function SectionGalerie({ items }: { items: Media[] }) {
  const [lightbox, setLightbox] = useState<Media | null>(null);
  const [type, setType] = useState<"all" | "image" | "video">("all");

  const tags = useMemo(() => {
    const s = new Set<string>();
    items.forEach((i) => i.tags?.forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [items]);

  const [tag, setTag] = useState<string | null>(null);

  const filtered = items.filter((i) => {
    const okType = type === "all" ? true : i.type === type;
    const okTag = tag ? i.tags?.includes(tag) : true;
    return okType && okTag;
  });

  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-3xl md:text-4xl font-serif">Galerie</h2>

        {/* Filtres */}
        <div className="flex flex-wrap items-center gap-2">
          {["all", "image", "video"].map((t) => (
            <button
              key={t}
              onClick={() => setType(t as any)}
              className={`rounded-full border px-4 py-1.5 text-sm ${
                type === t ? "bg-black text-white" : "bg-white hover:bg-gray-50"
              }`}
            >
              {t === "all" ? "Tous" : t === "image" ? "Photos" : "Vidéos"}
            </button>
          ))}
          <div className="w-px h-6 bg-gray-200 mx-1" />
          <button
            onClick={() => setTag(null)}
            className={`rounded-full border px-3 py-1.5 text-sm ${
              tag === null ? "bg-black text-white" : "bg-white hover:bg-gray-50"
            }`}
          >
            Tous les tags
          </button>
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`rounded-full border px-3 py-1.5 text-sm ${
                tag === t ? "bg-black text-white" : "bg-white hover:bg-gray-50"
              }`}
            >
              #{t}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.35 }}
        className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
      >
        {filtered.map((m) => (
          <motion.article
            key={m.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="break-inside-avoid rounded-2xl overflow-hidden border bg-white shadow-sm group"
          >
            <button
              onClick={() => setLightbox(m)}
              className="w-full text-left"
              aria-label={m.alt ?? m.titre ?? "ouvrir le média"}
            >
              <MediaPreview m={m} hoverZoom />
              {(m.titre || m.texte) && (
                <div className="p-4">
                  {m.titre && <h3 className="font-semibold">{m.titre}</h3>}
                  {m.texte && <p className="text-sm text-gray-600 mt-1">{m.texte}</p>}
                  {m.tags && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.tags.map((t) => (
                        <span key={t} className="text-xs rounded-full bg-gray-100 px-2 py-1">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </button>
          </motion.article>
        ))}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="w-full max-w-5xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full overflow-hidden rounded-2xl bg-black">
                <MediaView m={lightbox} />
                <button
                  onClick={() => setLightbox(null)}
                  className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-sm font-medium shadow hover:bg-white"
                >
                  Fermer
                </button>
              </div>

              {(lightbox.titre || lightbox.texte) && (
                <div className="mt-4 rounded-xl bg-white p-5 shadow">
                  {lightbox.titre && (
                    <h3 className="text-xl font-semibold mb-1">{lightbox.titre}</h3>
                  )}
                  {lightbox.texte && (
                    <p className="text-gray-700 leading-relaxed">{lightbox.texte}</p>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* =========================================================
   RENDUS MEDIA
   ========================================================= */
function MediaPreview({
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
          className={`object-cover ${
            hoverZoom ? "transition-transform duration-300 group-hover:scale-[1.02]" : ""
          }`}
        />
      ) : (
        <video
          src={m.src}
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
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

function MediaView({ m }: { m: Media }) {
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
    <video src={m.src} controls autoPlay className="w-full h-auto object-contain bg-black" />
  );
}
