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
