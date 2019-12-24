export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
      badge: {
        variant: "info",
        text: "NEW"
      }
    },
    {
      title: true,
      name: "Managements",
      wrapper: {
        // optional wrapper object
        element: "", // required valid HTML5 element tag
        attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: "" // optional class names space delimited list for title item ex: "text-center"
    },

    {
      name: "Transactions",
      url: "/transactions",
      icon: "icon-pie-chart"
    },
    {
      name: "Stay",
      url: "/stay",
      icon: "icon-home"
    },
    {
      name: "Experience",
      url: "/experience",
      icon: "icon-user"
    }

    // {
    //   name: "Place to stay",
    //   url: "/placetostay",
    //   icon: "icon-home"
    // }
  ]
};
