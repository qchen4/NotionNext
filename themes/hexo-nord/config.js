// Nord-flavored config for the Hexo layout
// You can still override any of these in blog.config.js (siteConfig reads those first).

const CONFIG_HEXO_NORD = {
  // Home banner & greetings
  HEXO_HOME_BANNER_ENABLE: true,
  HEXO_HOME_BANNER_GREETINGS: [
    'Hi, I’m Jeremy (Qiyue) Chen',
    'FPGA / ASIC / Embedded • Georgia Tech MS',
    'Welcome to my blog 🎉'
  ],

  // Home big icon buttons
  HEXO_HOME_NAV_BUTTONS: true,
  // Known upstream issue on mobile; leave false for stability
  HEXO_HOME_NAV_BACKGROUND_IMG_FIXED: false,
  HEXO_SHOW_START_READING: true,

  // Menu toggles
  HEXO_MENU_INDEX: true,
  HEXO_MENU_CATEGORY: true,
  HEXO_MENU_TAG: true,
  HEXO_MENU_ARCHIVE: true,
  HEXO_MENU_SEARCH: true,
  HEXO_MENU_RANDOM: true,

  // Post list behavior
  HEXO_POST_LIST_COVER: true,
  HEXO_POST_LIST_COVER_HOVER_ENLARGE: false,
  HEXO_POST_LIST_COVER_DEFAULT: true,
  HEXO_POST_LIST_SUMMARY: true,
  HEXO_POST_LIST_PREVIEW: false,
  HEXO_POST_LIST_IMG_CROSSOVER: true,

  // Article widgets
  HEXO_ARTICLE_ADJACENT: true,
  HEXO_ARTICLE_COPYRIGHT: true,
  HEXO_ARTICLE_NOT_BY_AI: false,
  HEXO_ARTICLE_RECOMMEND: true,

  // Right-side widgets
  HEXO_WIDGET_LATEST_POSTS: true,
  HEXO_WIDGET_ANALYTICS: false,
  HEXO_WIDGET_TO_TOP: true,
  HEXO_WIDGET_TO_COMMENT: true,
  HEXO_WIDGET_DARK_MODE: true,
  HEXO_WIDGET_TOC: true,

  // Theme color (accent) — default to Nord8 (#88C0D0). You can override in blog.config.js.
  HEXO_THEME_COLOR: '#88C0D0'
}

export default CONFIG_HEXO_NORD

