Meteor.startup(function (){
  ActiveLayout.configure({
    help: {
      link: "/menu",
      text: "",
      display: false
    },
    classes: {
      header: "",
      title: "",
      links: ""
    },
    text: {
      title: "Default Config",
      logout: "Logout"
    },
    fence: {
      north: 50,
      south: 0,
      east: 270,
      west: 270,
      maxPageWidth: 1024
    },
    defaults: {
      appSurfaceOffset: false,
      fullscreenNavbarsOverride: false,
      fullscreenNavbars: false,
      fullscreenOverride: true,
      fullscreen: true,
      hasPagePadding: false,
      hasPageVerticalPadding: false,
      mainPanelIsCard: false,
      navIsFullscreen: true,
      pageWhite: true,
      secondPanelEnabled: false,
      showNavbars: true,
      showSidebar: true,
      showSearchbar: false,
      symmatricalPadding: false,
      useHorizontalFences: false,
      useVerticalFences: true,
      useHierarchicalLayout: false,
      useCardLayout: false,
      useEastFence: false,
      wideCard: true
    }
  });
});
