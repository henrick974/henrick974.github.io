export type TemoignageMembreFelr = {
  id: string;
  prenom: string;
  nom?: string;
  fonction: string;
  photo: string; // ex: /temoignages/felr/jeanne.jpg
  temoignage: string;
};

export type TemoignageMembreSoutien = {
  id: string;
  prenom: string;
  nom?: string;
  titrePro: string; // ex: "Directrice Marketing"
  entreprise: string;
  photo: string; // ex: /temoignages/soutien/dupont.jpg
  temoignage: string;
};

export type TemoignageMosaiqueItem = { src: string; alt: string };

export const MOSAIQUE_TEMOIGNAGES: TemoignageMosaiqueItem[] = [
  { src: "/temoignages/mosaique/1.jpg", alt: "Membre FELR" },
  { src: "/temoignages/mosaique/2.jpg", alt: "Partenaire" },
  { src: "/temoignages/mosaique/3.jpg", alt: "Invitee" },
  { src: "/temoignages/mosaique/4.jpg", alt: "Membre soutien" },
  { src: "/temoignages/mosaique/5.jpg", alt: "Public" },
  { src: "/temoignages/mosaique/6.jpg", alt: "Equipe" },
];

export const MEMBRES_FELR: TemoignageMembreFelr[] = [
    {
      id: "felr-10",
      prenom: "Fanny",
      nom: "K.",
      fonction: "oratrice",
      photo: "/temoignages/felr/FANNY.jpg",
      temoignage:
            `Parce que je suis une femme, entrepreneure depuis cinq ans, partie de zéro et toujours en construction.

Parce que j’apprends, je doute, je tombe… et je rebondis (en général avec style et café à la main).

Parce que je suis maman-entrepreneure et que l’équilibre vie pro/vie perso reste un sport de haut niveau.

Après trois ans à avancer seule, j’ai ressenti le besoin de m’ouvrir, de rencontrer d’autres femmes, de m’inspirer de leurs parcours, de leur énergie et de sortir de mon isolement.

Ce qui fait sens dans l’association

La mission de FELR : nous faire monter en compétence, mieux comprendre les réalités du métier d’entrepreneur, développer le bon mindset et s’adapter en permanence.

L’énergie du collectif : un espace pour partager, apprendre, évoluer et se sentir portée.

2.⁠ ⁠Mon engagement en tant que membre soutien

Je m’engage parce que j’ai la chance de disposer d’un lieu physique, Seconde Vie Réunion, qui peut accueillir des femmes, des entrepreneurs, des associations, et leur offrir un espace où transmettre, apprendre et vivre des moments forts.

C’est important pour moi de contribuer à leur croissance, à leur confiance, et de soutenir celles qui, comme moi, construisent leur liberté.`,
  },

  {
    id: "felr-7",
    prenom: "Hélène",
    nom: "K.",
    fonction: "oratrice",
    photo: "/temoignages/felr/Hélène.jpg",
    temoignage:
            `De mon côté, j’ai souhaité contribuer à FELR en permettant aux femmes entrepreneures de profiter de mon espace de travail, gracieusement pour les sessions d’ateliers collectifs et à tarif préférentiel en location individuelle pour lancer et développer leur activité dans le Nord.
Devenir membre soutien de FELR est devenue une évidence pour moi, un engagement social en phase avec mes valeurs d’entraide, d’engagement et ma passion pour le développement personnel, parallèlement au développement professionnel.`,
  },

  {
    id: "felr-6",
    prenom: "Geneviève",
    nom: "K.",
    fonction: "oratrice",
    photo: "/temoignages/felr/GENEVIEVE.jpg",
    temoignage:
            `Faire partie de FELR, c’est pour moi bien plus qu’intégrer un réseau : c’est partager une vision commune, celle de femmes audacieuses qui s’élèvent ensemble et s’inspirent mutuellement.
Je m’y retrouve pleinement, parce que l’association incarne des valeurs que je porte profondément : la bienveillance, l’entraide et le rayonnement au féminin.
Un mot en particulier pour Patricia BOUCARD, la Présidente, qui a su cerner avec justesse ma problématique, toujours à l’écoute, bienveillante, et qui me pousse à me dépasser. Même lorsqu’elle me laisse avancer à mon rythme, elle sait me lancer des défis, qui m’aident à m’élever, à renforcer ma confiance et à révéler des talents que je ne soupçonnais pas. Je lui adresse toute ma gratitude pour cette confiance.
En tant que membre soutien, mon engagement est une manière concrète de contribuer à cette énergie collective et de valoriser les femmes qui osent et qui font bouger les lignes.
Être partenaire de la White & Silver Celebration 2025, c’est une évidence : célébrer la lumière, l’élégance et le chemin parcouru ensemble, dans un esprit de partage et d’inspiration commune.`,
  },

  {
    id: "felr-13",
    prenom: "Henrick",
    nom: "K.",
    fonction: "oratrice",
    photo: "/temoignages/felr/HENRICK.png",
    temoignage:
            `Il va de soi que j’ai décidé de devenir membre soutien de l’association Femmes Entrepreneures et Leaders de La Réunion. Après avoir collaboré avec Patricia et avoir construit une relation fondée sur la confiance, l’écoute et le respect, il m’a paru évident de poursuivre cette aventure à ses côtés et aux côtés de l’association.

En tant qu’entrepreneur dans le domaine du digital et de l’informatique, je souhaite mettre mes compétences au service des membres : les accompagner dans leur présence en ligne, les aider à structurer leurs outils numériques, les conseiller sur leurs sites internet, leur communication ou encore l’utilisation de solutions digitales pour gagner en visibilité et en efficacité.

Devenir membre soutien, pour moi, ce n’est pas seulement “adhérer” à une structure. C’est m’engager concrètement à :
– participer aux événements et aux ateliers,
– contribuer à des temps de partage d’expérience,
– proposer, lorsque c’est utile, des interventions ou des formations sur les sujets que je maîtrise,
– être disponible pour répondre aux questions des entrepreneures qui en ont besoin.

Je crois profondément au potentiel des femmes entrepreneures de La Réunion et je suis convaincu que le collectif est un levier puissant de réussite. En rejoignant l’association en tant que membre soutien, mon objectif est de contribuer, à mon niveau, à la réussite de chaque membre : en partageant mes connaissances, en apportant des solutions concrètes et en soutenant leurs projets avec bienveillance et professionnalisme.`,
  },

  {
    id: "felr-8",
    prenom: "Philippe",
    nom: "K.",
    fonction: "oratrice",
    photo: "/temoignages/felr/PHILIPPE.jpg",
    temoignage:
            `Mon arrivée chez FELR ?

Elle s’est faite de façon naturelle. Gisèle, mon épouse, était déjà dans l’association, et comme je venais de partir à la retraite, je me suis dit : pourquoi pas ? Notre réseau en métropole est similaire. J’ai été conquis dès mon premier atelier : j’ai ressenti une véritable résonance, les mêmes valeurs, la même bienveillance, le même état d’esprit, l’entraide… et une vision énorme, comme une évidence.

Mon engagement en tant que membre soutien s’est imposé naturellement. Disposant du temps nécessaire, je me suis mis aux tâches techniques : prise de photos, émargement. J’ai vu évoluer chacune… et moi aussi. C’était aussi l’occasion de rencontrer de nouvelles personnes, d’observer le travail de cheffes d’entreprise inspirantes : prendre des idées, observer leurs postures, et les adapter pour avancer dans mon propre rôle.

En tant que membre soutien, je m’imprègne de leur état d’esprit, je participe aux ateliers, j’aide à mettre en place les espaces d’information, et je continue à porter les valeurs du réseau avec cohérence et authenticité.

Ma micro-entreprise a un an d’existence et j’ai choisi de me spécialiser dans le nettoyage à la vapeur sèche. C’est aux côtés de Mme Carole Bordes, membre de FELR et pionnière de ce concept écologique sur l’île, que j’ai pu me former : une base théorique solide, suivie d’une pratique qui a transformé ma vision du nettoyage.`,
  },

  {
    id: "felr-15",
    prenom: "Abdoul",
    nom: "K.",
    fonction: "orateur",
    photo: "/temoignages/felr/ABDOUL.jpeg",
    temoignage:
            ` Je me retrouve chez FELR sur les bons conseils de Carine Merlo Rivière, membre salarié qui a eu la clairvoyance de me dire que ce serait intéressant de me connecter avec Patricia Boucard et FELR son association. Au vu des conseils que j'ai pu apporter à Carine sur le marketing digital et sur des compétences transversales comme l'audace la prise de parole face caméra, elle m'a dit que ce serait super que j'en fasse profiter au membre de l'association. 
 
Et moi ça tombait bien j'avais croisé déjà en vrai Patricia à un évènement sur le marketing digital d'ailleurs et j'avais peut-être anticipé en prenant son numéro de téléphone occasion des opportunités pourraient apparaître plus tard entre nous d’eux. Pas une pas deux j'ai appelé Patricia juste après cet échange avec Carine. Et c'était un match! Patricia m'a invité à son événement et depuis je suis membre soutien sur la thématique Marketing-Digital-Video.

Ce qui fait sens pour moi c'est déjà de suivre mon intuition de travailler avec des personnes qui partagent les mêmes valeurs que moi et même ambitions que moi et d'être avec des personnes qui ont confiance en moi et qui aiment bien aussi avoir des moments fun.
 
L'engagement de membre soutien de l'association je le fais parce que je me rappelle en 2014 quand j'ai lancé ma première activité d'entrepreneur dans la photographie j'étais seul, pas accompagné en dehors du domaine administratif et c'était clairement la hess parce que je n'avais pas les bonnes clés, je n'avais pas des gens qui me partager leur expérience pour gagner du temps et de la maturité et j'aurais adoré à l'époque que des personnes comme ça soient sur mon chemin. Durant les premiers mois de l'activité je n'avais clairement pas le budget pour m'offrir des mentorings ou des coachings, mais parfois, et c'est le cas chez Felr, on peut s'entourer sans avoir des milles et des cents.
 
 `,
  },

  {
    id: "felr-9",
    prenom: "Mickaelle",
    nom: "K.",
    fonction: "oratrice",
    photo: "/temoignages/felr/MICKAELLE.jpg",
    temoignage:
            `Je suis ravie de faire partie de FELR car j'ai fait de belles rencontres avec des personnes qui aiment ce qu'ils font. J'ai découvert des domaines nouveaux et des choses intéressantes professionnellement et humainement. C'est une vraie richesse, en terme de compétences multiples des membres, de savoirs, d'expériences mais aussi car avec toutes leurs expériences professionnelles Patricia et Pascal sont des personnes vraies et bienveillants qui partagent leurs savoirs aux autres et mettent en avant leurs membres. 
En tant que femme auto-entrepreneure, avoir des ateliers pour nous apprendre de nouvelles compétences, avoir des conseils et tout cela dans la bienveillance et avec le sourire, ce sont des forces en tant que femme. 
Même si je ne peux malheureusement pas toujours être prèsente, ils donnent de leur temps et leur énergie en étant vrais et alignés.

Ton engagement de membre soutien de l’association pourquoi tu le fais ?
J'ai eu la chance de rencontrer une femme inspirante, Patricia Boucard lors d'un atelier.
Ce n'était pas un hasard. Son expérience, le fait qu'elle soit elle même, elle aide et accompagne les autres femmes à se sur passer est magnifique. 
Ce sont des personnes vraies, bienveillants, reconnaissants, engagés qui donnent la force aux autres et nous booste, nous motive à avancer. 
Ce sont de belles personnes avec des valeurs comme l'entraide, le respect, la sincérité, la bienveillance qui oeuvrent pour aider les femmes à se surpasser alors si je peux aider et contribuer à aider d'autres personnes avec mes compétences ce sera avec plaisir. Voilà pourquoi je soutiens FELR. Merci à vous 🙏`,
  },

  {
    id: "felr-3",
    prenom: "Nicole",
    nom: "K.",
    fonction: "oratrice",
    photo: "/temoignages/felr/NICOLE.jpg",
    temoignage:
            `L’énergie collective résonne pour moi chez FELR et la capacité à rassembler des femmes ambitieuses, déterminées à créer, entreprendre et faire bouger les lignes à la Réunion. 

La vision de FELR me parle parce qu’elle place les femmes au cœur du développement économique local

La mission de FELR fait sens pour moi car elle créé un espace ou les entrepreneures peuvent
o	Se soutenir mutuellement
o	Développer leurs compétences, 
o	Oser davantage
o	Prendre leur place en tant que leaders


En tant que cheffe d’entreprise expérimentée, être membre soutien me permet d’accompagner, de transmettre et de contribuer au parcours d’autres femmes, tout en continuant moi-même à apprendre de leurs expériences

J’ai choisi de m’engager parce que je souhaitais mettre mon expérience de cheffe d’entreprise au service d’autres femmes pour contribuer à leur réussite, leur donner de l’élan et après des années à entreprendre j’ai eu envie de redonner ce que j’ai reçu de transmettre ce que j’ai appris : les réussites comme les obstacles.


o	C’est un espace ou je me sens utile
o	Un lieu où je peux partager sans filtre
o	Un cercle qui valorise la solidarité, la transmission et l’audace
o	Une manière de contribuer à l’émergence d’un leadership féminin plus fort à la Réunion
o	Je nourris un besoin profond : celui de soutenir, d’inspirer et d’ouvrir la voie à celles qui entreprennent`,
  },

  {
    id: "felr-1",
    prenom: "Adeline",
    nom: "L.",
    fonction: "oratrice",
    photo: "/temoignages/felr/ADELINE.jpg",
    temoignage:
      `J'ai choisi de m'engager dans FELR quand j'ai decouvert cette association il y a 1 an et demi. J'ai ete enthousiaste 
      par son but de promouvoir l'empowerment des femmes sur le territoire reunionnais, avec sa vision positive, 
      le dynamisme de son equipe et la qualite du reseau. FELR, en adequation avec ses valeurs, me permet de mettre 
      en oeuvre mes competences sociales et relationnelles ainsi que mon experience d'entrepreneure au profit 
      des femmes leaders et entrepreneures. En tant que membre soutien, j'accompagne les femmes pour se realiser 
      grace a leurs specificites, lever les blocages, se reconnecter a leur corps et avancer avec douceur. 
      J'apporte du sacre dans les petites choses du quotidien, de l'ame-agit et de la legerete pour egayer les obstacles, 
      en mettant mon expertise de guidance intuitive au service de leur epanouissement.`,
  },

  {
    id: "felr-5",
    prenom: "Julie",
    nom: "K.",
    fonction: "oratrice",
    photo: "/temoignages/felr/JULIE.jpg",
    temoignage:
            `1.⁠ ⁠Pourquoi je me retrouve chez FELR

Je me suis retrouvée chez FELR après ma rencontre avec Patricia, la présidente, pour la création du magazine de l’association. La mission de FELR résonne avec ma vision : valoriser les femmes entrepreneures de La Réunion et les aider à développer leur activité grâce au numérique.
J’aime aider les entrepreneurs à exceller dans ce qu’ils font en leur fournissant des supports digitaux efficaces et en leur permettant de créer du lien avec leurs clients. FELR incarne cette dynamique : chacun peut trouver sa place et avancer dans ses projets.

2.⁠ ⁠Mon engagement en tant que membre soutien

En tant que membre soutien, je souhaite mettre mes compétences au service du réseau.
Je propose des ateliers quand je le peux et j’accompagne les femmes de FELR à structurer leur image sur les réseaux sociaux et via le numérique.
Ce qui me motive : aider les entrepreneuses, en particulie`,
  },

  {
    id: "felr-14",
    prenom: "Gisèle",
    nom: "K.",
    fonction: "Coach bien être",
    photo: "/temoignages/felr/GISELE.jpeg",
    temoignage:
            `Deux ans déjà que je suis membre oratrice au sein de l’Association Femmes Entrepreneures et Leaders de la Réunion — et chaque instant me rappelle mes 17 ans de parcours dans mon réseau partenaire. ici, c’est plus qu’un regroupement : c’est une famille.
L’engagement se ressent comme un battement d’âme, le partage circule comme une bonne ambiance lontan, la convivialité réchauffe comme un sourire péi, et l’inspiration jaillit des ateliers que nous créons ensemble.
Je suis fière de faire partie de cette Association si vivante, menée par une présidente positive, dynamique et pleine de ce petit grain de fun que j’adore.
Longue vie à ce réseau qui illumine les femmes et leurs ambitions ! Je suis Gisèle LAURATET, Coach bien être`,
  },

  {
    id: "felr-4",
    prenom: "Carole",
    nom: "K.",
    fonction: "oratrice",
    photo: "/temoignages/felr/CAROLE.jpg",
    temoignage:
            `Je suis Carole Bordes, fondatrice d’Agil Vapeur Solutions, engagée pour une propreté écologique, humaine et consciente à La Réunion.
J’ai rejoint Femmes, Entrepreneures & Leaders pour faire rayonner la force du collectif féminin et une nouvelle façon d’entreprendre, plus respectueuse du vivant.
Je suis partenaire de ce 2ème  anniversaire, je célèbre deux ans d’audace, de sororité et d’inspiration au service du territoire. 🌿`,
  },

  {
    id: "felr-17",
    prenom: "Stella",
    nom: "K.",
    fonction: "oratrice",
    photo: "/temoignages/felr/STELLA.jpeg",
    temoignage:
            `En tant qu'ancienne salariée, je suis arrivée dans le monde de l’entrepreneuriat sans connaître personne et un peu perdue.
 
C'est en rencontrant Patricia BOUCARD- Présidente de l’association, que j'ai découvert FELR, qui correspondait parfaitement à mon besoin de sororité.
 
En fédérant depuis 2 ans, J'ai trouvé bien plus qu'une association : des valeurs de partage et des ateliers qui m'ont permis de grandir, notamment en tant qu'ORATRICE 2, programme que Patricia nous propose pour la prise de parole en public.
 
Aujourd'hui, je tremble beaucoup moins avant de parler en public et je suis fière de faire partie de FELR-Femmes Entrepreneures et Leaders de La Réunion`,
  },

  {
    id: "felr-2",
    prenom: "Micheline",
    nom: "R.",
    fonction: "actif",
    photo: "/temoignages/felr/MICHELINE.jpg",
    temoignage: `Pourquoi je suis dans FELR ?

J’ai toujours été fascinée par… l’Humain. Oui, c’est presque une vocation : comprendre, échanger, écouter, apprendre, rire, partager. Professionnellement comme personnellement, j’ai toujours eu besoin de créer du lien.
Quand j’étais salariée, je prenais quelques minutes  à demander des nouvelles des enfants avant de  parler des dossiers. 
Mon boss grinçait des dents… mais mes clients, eux, adoraient.
 Et au final, ce sont eux qui m’ont suivie lorsque j’ai créé ma première entreprise, Nuwa. Comme quoi, le lien humain, ça paie !

Avec Kalico System, j’ai enfin pu faire les choses totalement à ma manière : du sérieux, oui, mais jamais sans une bonne dose de proximité, de rires et d’écoute. 
Le seul souci ? Pendant des années, j’ai évolué dans un univers très masculin. Très instructif… mais je rêvais d’un espace où je pourrais échanger avec des personnes qui vivent les mêmes montagnes russes que moi, mais en version féminine, déterminée et inspirante.

Et puis un jour, j’ai croisé Patricia Boucard. Et comme toute bonne rencontre qui change une trajectoire, elle m’a fait connaitre que cet espace d'échanges existe : " FELR.”

Dans FELR, j’ai découvert une constellation de femmes aussi différentes que passionnantes, avec un point commun : grandir ensemble.
Ici, on partage (beaucoup).
On apprend (tout le temps).
On échange (intensément).
On rigole (encore plus).
Et surtout, on retrouve des valeurs dans lesquelles je me reconnais profondément.

Les rencontres FELR sont devenues mes bulles d’oxygène dans mon quotidien d’entrepreneure.
Parce que soyons honnêtes : discuter “d’égal à égal” avec ses salariés, c’est souvent un mythe… mais avec FELR, ce rêve devient réalité.
On y trouve des pairs, des confidences de chefs d’entreprise, des solutions, des pistes, de la niaque, du courage et une belle bande de femmes prêtes à avancer ensemble.`,
  },

  {
    id: "felr-18",
    prenom: "Sandra",
    nom: "K.",
    fonction: "oratrice",
    photo: "/temoignages/felr/SANDRA.jpeg",
    temoignage:
            `J’ai fait le choix d’adhérer à l’association FELR parce qu’en plus de répondre à mon  besoin de m’entourer de pairs, j’acquière des compétences indispensables à la vie entrepreneuriale grâce aux ateliers dont la quasi-totalité sont animés par les membres.
 
Je gagne aussi en visibilité et en leadership, sans compter l’effet “wouah” des activités et des surprises de l’association sur mon mindset !
Enfin, FELR sonne juste pour moi, parce qu’au-delà de la bienveillance, de l’engagement de chacune des membres
Patricia BOUCARD, présidente de l’ Association, fait vivre ce mouvement dans l’action avec professionnalisme, joie , humour et enthousiasme.`,
  },

                {
    id: "felr-11",
    prenom: "Graziella",
    nom: "K.",
    fonction: "oratrice",
    photo: "/temoignages/felr/GRAZIELLA.jpg",
    temoignage:
            `Après plus de 15 ans dans la communication et le marketing, j’ai choisi de me réinventer. De mettre mes compétences au service d’une mission qui m’anime : élever l’hospitalité réunionnaise en créant des expériences locatives mémorables et rentables.
Et dans cette transition, FELR a été une évidence.

Ici, j’y retrouve des femmes qui comprennent le chemin, les doutes, l’audace et la volonté de construire quelque chose qui nous ressemble.

C’est un lieu où je peux apprendre, partager, grandir sans me travestir, oser et devenir la femme entrepreneure que je veux être.
C’est un lieu où je peux être à la fois entrepreneure, créative, maman, femme en reconversion, et surtout femme qui avance.

Un espace où l’on parle vision, audace, résilience… mais aussi doutes, réalités et victoires du quotidien.`,
  },


                  {
    id: "felr-12",
    prenom: "Nafissa",
    nom: "K.",
    fonction: "oratrice",
    photo: "/temoignages/felr/Nafissa.jpg",
    temoignage:
            `Pourquoi FELR

Je me suis inscrite chez FELR grâce aux recommandations de Marjorie ORANGE. Et je dois dire que ça a été la meilleure décision que j’ai prise depuis mon entree dans l’entreprenariat en 2024.
J’y ai trouvé une sororité, de l’entraide, un accompagnement ciblé, une montée en compétence au travers des ateliers  et un soutien indéfectible. Je suis quelqu’un de très solaire, positive et qui paraît toujours très forte. J’ai eu l’habitude de cacher mes émotions depuis que j’ai 5 ans peut être à cause de mon histoire de vie pas très réjouissante. 
Une anecdote qui illustre cette sororité : J’ai eu une période très compliquée après le cyclone CHIDO, et j’a fait ce que je savais faire le mieux dans ce genre de situation : me renfermer sur moi-même et essayer de ne pas sombrer.  J’avais envie de tout arrêter. De repartir dans le salariat et ne plus réfléchir. 
Et soudain, sans que je ne le demande, comme si notre présidente sentait ma détresse, j’ai eu sa main qui se tendait, qui m’empêchait de couler, qui me maintenait à flot et me poussait à me dépasser, à ne pas lâcher, à ne pas baisser les bras. Elle m’a soutenu comme bons nombre d’adhérents. Et me soutiennent encore dans les hauts et les bas, en me donnant leur conseils, en me donnant parfois juste l’exemple. 

Aujourd’hui c’est grâce à cette association que mon entreprise avance, se développe. Ce n’est pas simple tous les jours, c’est parfois même très compliqué, mais je n’oublie pas les mots de Patricia : ça va payer, tu verras tes efforts vont payer. 
Alors merci FELR.`,
  },

  {
    id: "felr-16",
    prenom: "Gaëlle",
    nom: "K.",
    fonction: "oratrice",
    photo: "/temoignages/felr/GAELLE.jpeg",
    temoignage:
            `Membre FELR depuis janvier 2025, j'aime les ateliers mensuels en visio : de quoi apprendre, progresser, découvrir les expertises des autres membres, mais aussi partager mon propre travail et expertises.
J’aime l’énergie des rencontres en présentiel : des moments de connexion humaine directe et chaleureuse avec les autres membres.
Et j'aime le sérieux du bureau : tout est clair, organisé et bien cadré.
 `,
  },
];

export const MEMBRES_SOUTIEN: TemoignageMembreSoutien[] = [
  {
    id: "soutien-4",
    prenom: "MICHELINE",
    nom: "Nguyen",
    titrePro: "Responsable Communication",
    entreprise: "Oceanik",
    photo: "/temoignages/soutien/MICHELINE.jpg",
    temoignage: "",
  },
  {
    id: "soutien-2",
    prenom: "CAROLE",
    nom: "Nguyen",
    titrePro: "Responsable Communication",
    entreprise: "Oceanik",
    photo: "/temoignages/soutien/CAROLE.jpg",
    temoignage: "",
  },
  {
    id: "soutien-5",
    prenom: "JULIE ET JULIEN DINOT",
    nom: "Nguyen",
    titrePro: "Responsable Communication",
    entreprise: "Oceanik",
    photo: "/temoignages/soutien/JULIE.jpg",
    temoignage: "",
  },
  {
    id: "soutien-6",
    prenom: "HENRICK",
    nom: "Nguyen",
    titrePro: "Responsable Communication",
    entreprise: "Oceanik",
    photo: "/temoignages/soutien/HENRICK.jpg",
    temoignage: "",
  },
  {
    id: "soutien-3",
    prenom: "GENEVIEVE",
    nom: "Nguyen",
    titrePro: "Responsable Communication",
    entreprise: "Oceanik",
    photo: "/temoignages/soutien/GENEVIEVE.jpg",
    temoignage: "",
  },
  {
    id: "soutien-1",
    prenom: "ABDOUL",
    nom: "Dupont",
    titrePro: "Directeur",
    entreprise: "Studio Zenith",
    photo: "/temoignages/soutien/ABDOUL.jpg",
    temoignage: "",
  },
  {
    id: "soutien-7",
    prenom: "MAGALIE",
    nom: "Nguyen",
    titrePro: "Responsable Communication",
    entreprise: "Oceanik",
    photo: "/temoignages/soutien/MAGALIE.jpg",
    temoignage: "",
  },
];

