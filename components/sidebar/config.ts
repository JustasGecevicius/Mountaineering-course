import { v4 } from "uuid";

export const sidebarConfig = {
  header: {
    id: v4(),
    name: "Mountaineering Course",
  },
  body: {
    Home: {
      id: v4(),
      href: "/",
      type: "button",
    },
    Knots: {
      id: v4(),
      href: "/knots",
      type: "button",
    },
    Techniques: {
      id: v4(),
      href: "/techniques",
      type: "button",
    },
    Basics: {
      type: "group",
      id: v4(),
      body: {
        Knots: {
          id: v4(),
          href: "/basics/knots",
          type: "button",
        },
        Techniques: {
          id: v4(),
          href: "/basics/techniques",
          type: "button",
        },
      },
    },
  },
};
