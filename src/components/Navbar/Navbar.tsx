import { useAuth } from "../../hooks/useAuth";
import CardNav from "./CardNav";

type PropsNav = {
  label: string;
  textColor: string;
  bgColor: string;
  links: { label: string; href: string; ariaLabel: string }[];
}[];

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  const items: PropsNav = [
    {
      label: "Apprendre l'arabe",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        {
          label: "Les catégories",
          href: "/learn-arabic",
          ariaLabel: "Les catégories",
        },
        {
          label: "Tous les cours",
          href: "/learn-arabic/lessons",
          ariaLabel: "Tous les cours",
        },

        ...(isAuthenticated
          ? [
              {
                label: "Quiz",
                href: "/quiz",
                ariaLabel: "Quiz",
              },
              {
                label: "Flashcards",
                href: "/flashcards",
                ariaLabel: "Flashcards",
              },
            ]
          : []),
      ],
    },
    {
      label: "Dico",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        {
          label: "Dico public",
          href: "/dico/public",
          ariaLabel: "Dico public",
        },
        ...(isAuthenticated
          ? [
              {
                label: "Mon dico",
                href: "/dico/my-dico",
                ariaLabel: "Mon dico",
              },
              {
                label: "Dico par thèmes",
                href: "/dico/themes",
                ariaLabel: "Dico par thèmes",
              },
              {
                label: "Ajouter dans mon dico",
                href: "/dico/add-choice",
                ariaLabel: "Ajouter dans mon dico",
              },
            ]
          : []),
      ],
    },
    ...(isAuthenticated
      ? [
          {
            label: "Mon compte",
            bgColor: "#1A1022",
            textColor: "#fff",
            links: [
              {
                label: "Mes dossiers",
                href: "/folders",
                ariaLabel: "Mes dossiers",
              },
              {
                label: "Mon tableau de bord",
                href: "/dashboard",
                ariaLabel: "Mon tableau de bord",
              },
              {
                label: "Déconnexion",
                href: "/logout",
                ariaLabel: "Déconnexion",
              },
            ],
          },
        ]
      : [
          {
            label: "Connexion",
            bgColor: "#1A1022",
            textColor: "#fff",
            links: [
              {
                label: "Se connecter",
                href: "/login",
                ariaLabel: "Se connecter",
              },
              {
                label: "S’inscrire",
                href: "/register",
                ariaLabel: "S’inscrire",
              },
            ],
          },
        ]),
  ];

  return (
    <CardNav
      items={items}
      baseColor="#fff"
      menuColor="#000"
      buttonBgColor="#111"
      buttonTextColor="#fff"
      ease="power3.out"
    />
  );
};

export default Navbar;
