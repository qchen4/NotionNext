/* eslint-disable react/no-unknown-property */
import { siteConfig } from '@/lib/config'
import CONFIG from './config'

/**
 * Hexo → Nord skin
 * - Keeps Hexo selectors so nothing else breaks
 * - Adds full Nord palette as CSS variables
 * - Uses HEXO_THEME_COLOR as the accent (fallback = Nord8 #88C0D0)
 *
 * Docs: NotionNext custom themes & style.js per-theme CSS
 * - https://docs.tangly1024.com/article/your-own-theme
 * - https://docs.tangly1024.com/article/custom-your-style
 */
const Style = () => {
  // Accent color (links, hovers, pills, etc.)
  // You can override in blog.config.js -> HEXO_THEME_COLOR
  const themeColor = siteConfig('HEXO_THEME_COLOR', '#88C0D0', CONFIG) // Nord8

  return (
    <style jsx global>{`
      :root {
        /* Nord palette tokens */
        --nord0:#2e3440; --nord1:#3b4252; --nord2:#434c5e; --nord3:#4c566a;
        --nord4:#d8dee9; --nord5:#e5e9f0; --nord6:#eceff4;
        --nord7:#8fbcbb; --nord8:#88c0d0; --nord9:#81a1c1; --nord10:#5e81ac;
        --nord11:#bf616a; --nord12:#d08770; --nord13:#ebcb8b; --nord14:#a3be8c; --nord15:#b48ead;

        /* Accent used across Hexo selectors mapped from "indigo" */
        --theme-color: ${themeColor};
      }

      /* Base backgrounds (keep Hexo scope) */
      #theme-hexo body { background-color: var(--nord6); }       /* light */
      .dark #theme-hexo body { background-color: var(--nord0); }  /* dark */

      /* Menu underline hover (Hexo's .menu-link pattern) */
      #theme-hexo .menu-link{
        text-decoration: none;
        background-image: linear-gradient(var(--theme-color), var(--theme-color));
        background-repeat: no-repeat;
        background-position: bottom center;
        background-size: 0 2px;
        transition: background-size 120ms ease-in-out,color 120ms ease-in-out;
      }
      #theme-hexo .menu-link:hover{ background-size:100% 2px; color:var(--theme-color); }

      /* Post list title hover color */
      #theme-hexo h2:hover .menu-link{ color:var(--theme-color) !important; }
      .dark #theme-hexo h2:hover .menu-link{ color:var(--theme-color) !important; }

      /* Dropdown / tags / nav hovers mapped from indigo utility classes */
      #theme-hexo li[class*='hover:bg-indigo-500']:hover{ background-color:var(--theme-color) !important; }
      #theme-hexo a[class*='hover:bg-indigo-400']:hover{ background-color:var(--theme-color) !important; }
      #theme-hexo i[class*='hover:text-indigo-600']:hover{ color:var(--theme-color) !important; }
      .dark #theme-hexo i[class*='dark:hover:text-indigo-400']:hover{ color:var(--theme-color) !important; }
      #theme-hexo #nav div[class*='hover:text-indigo-600']:hover{ color:var(--theme-color) !important; }
      .dark #theme-hexo #nav div[class*='dark:hover:text-indigo-400']:hover{ color:var(--theme-color) !important; }
      #theme-hexo div[class*='hover:text-indigo-600']:hover,
      #theme-hexo div[class*='hover:text-indigo-400']:hover{ color:var(--theme-color) !important; }

      /* Pagination + chips */
      #theme-hexo .text-indigo-400{ color:var(--theme-color) !important; }
      #theme-hexo .border-indigo-400{ border-color:var(--theme-color) !important; }
      #theme-hexo a[class*='hover:bg-indigo-400']:hover{
        background-color:var(--theme-color) !important; color:white !important;
      }
      #theme-hexo .hover\\:bg-indigo-400:hover{ background-color:var(--theme-color) !important; }
      #theme-hexo .bg-indigo-400{ background-color:var(--theme-color) !important; }
      #theme-hexo a[class*='hover:bg-indigo-600']:hover{
        background-color:var(--theme-color) !important; color:white !important;
      }

      /* Floating action button + mobile menu */
      #theme-hexo .bg-indigo-500{ background-color:var(--theme-color) !important; }
      .dark #theme-hexo .dark\\:bg-indigo-500{ background-color:var(--theme-color) !important; }
      #theme-hexo div[class*='hover:bg-indigo-500']:hover{ background-color:var(--theme-color) !important; }

      /* Reading progress + on-page headings */
      #theme-hexo .bg-indigo-600{ background-color:var(--theme-color) !important; }
      #theme-hexo .border-indigo-800{ border-color:var(--theme-color) !important; }
      #theme-hexo .text-indigo-800{ color:var(--theme-color) !important; }
      .dark #theme-hexo .dark\\:text-indigo-400{ color:var(--theme-color) !important; }
      .dark #theme-hexo .dark\\:border-indigo-400{ border-color:var(--theme-color) !important; }
      .dark #theme-hexo .dark\\:border-white{ border-color:var(--theme-color) !important; }
      #theme-hexo a[class*='hover:text-indigo-800']:hover{ color:var(--theme-color) !important; }

      /* TOC defaults in dark mode */
      .dark #theme-hexo .catalog-item{ color:var(--nord6) !important; border-color:var(--nord6) !important; }
      .dark #theme-hexo .catalog-item:hover{ color:var(--theme-color) !important; }
      .dark #theme-hexo .catalog-item.font-bold{ border-color:var(--theme-color) !important; }

      /* Copyright left border */
      #theme-hexo .border-indigo-500{ border-color:var(--theme-color) !important; }

      /* Archive list item left border (hover) */
      #theme-hexo li[class*='hover:border-indigo-500']:hover{ border-color:var(--theme-color) !important; }

      /* Context menu hover */
      #theme-hexo .hover\\:bg-blue-600:hover{ background-color:var(--theme-color) !important; }
      .dark #theme-hexo li[class*='dark:hover:border-indigo-300']:hover{ border-color:var(--theme-color) !important; }
      .dark #theme-hexo li[class*='dark:border-indigo-400']{ border-color:var(--theme-color) !important; }
      .dark #theme-hexo a[class*='dark:hover:text-indigo-300']:hover{ color:var(--theme-color) !important; }

      /* Header cover gradient (unchanged, reads better with Nord) */
      #theme-hexo .header-cover::before{
        content:''; position:absolute; inset:0;
        background:linear-gradient(
          to bottom,
          rgba(0,0,0,0.5) 0%,
          rgba(0,0,0,0.2) 10%,
          rgba(0,0,0,0) 25%,
          rgba(0,0,0,0.2) 75%,
          rgba(0,0,0,0.5) 100%
        );
      }

      /* Misc. */
      .tk-footer{ opacity:0; }

      /* Text selection tint with Nord accent */
      ::selection{ background: color-mix(in srgb, var(--theme-color) 30%, transparent); }

      /* Scrollbars (accent) */
      ::-webkit-scrollbar{ width:5px; height:5px; }
      ::-webkit-scrollbar-track{ background:transparent; }
      ::-webkit-scrollbar-thumb{ background-color:var(--theme-color); }
      *{ scrollbar-width:thin; scrollbar-color:var(--theme-color) transparent; }
    `}</style>
  )
}

export { Style }

