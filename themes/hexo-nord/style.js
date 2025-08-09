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
// style.js – stronger Nord overrides
export const Style = () => (
  <style jsx global>{`
    :root{
      --nord0:#2e3440; --nord1:#3b4252; --nord2:#434c5e; --nord3:#4c566a;
      --nord4:#d8dee9; --nord5:#e5e9f0; --nord6:#eceff4;
      --nord7:#8fbcbb; --nord8:#88c0d0; --nord9:#81a1c1; --nord10:#5e81ac;
      --nord11:#bf616a; --nord12:#d08770; --nord13:#ebcb8b; --nord14:#a3be8c; --nord15:#b48ead;
      --theme-color: var(--nord8);
    }

    /* ===== Base (dark-forward Nord) ===== */
    #theme-hexo body { background: var(--nord0); color: var(--nord6); }
    #theme-hexo a { color: var(--nord8); }
    #theme-hexo a:hover { color: var(--nord9); }

    /* Sticky nav / header */
    #theme-hexo .sticky-nav {
      background: color-mix(in oklab, var(--nord0) 85%, transparent);
      -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px);
      border-bottom: 1px solid color-mix(in srgb, var(--nord3) 60%, transparent);
    }
    #theme-hexo .sticky-nav-full .nav { color: var(--nord4); }

    /* Cards, containers, article wrappers */
    #theme-hexo .shadow-card,
    #theme-hexo .article,
    #theme-hexo .notion,
    #theme-hexo .card {
      background: var(--nord1) !important;
      color: var(--nord6) !important;
      box-shadow: 0 10px 28px rgba(46,52,64,.35);
      border-color: var(--nord2) !important;
    }
    /* Kill leftover white boxes from Hexo defaults */
    #theme-hexo .bg-white { background: var(--nord1) !important; }
    #theme-hexo .dark\\:bg-hexo-black-gray,
    .dark #theme-hexo .dark\\:bg-hexo-black-gray { background: var(--nord0) !important; }

    /* Text & headings */
    #theme-hexo .gt-meta, #theme-hexo .prose { color: var(--nord6); }
    #theme-hexo .prose h1, #theme-hexo .prose h2, #theme-hexo .prose h3 { color: var(--nord6); }
    #theme-hexo .prose blockquote { border-left: 3px solid var(--nord3); color: var(--nord5); }

    /* Buttons / chips / pills (map “indigo” → Nord accent) */
    #theme-hexo .btn, #theme-hexo .bg-indigo-500, #theme-hexo .bg-indigo-400,
    #theme-hexo a[class*='hover:bg-indigo-4']:hover,
    #theme-hexo a[class*='hover:bg-indigo-5']:hover {
      background: var(--theme-color) !important; color: var(--nord6) !important;
    }
    #theme-hexo .text-indigo-400 { color: var(--theme-color) !important; }
    #theme-hexo .border-indigo-400, #theme-hexo .border-indigo-500 { border-color: var(--theme-color) !important; }

    /* Tags */
    #theme-hexo .tag { background: var(--nord2) !important; color: var(--nord6) !important; }
    #theme-hexo .tag:hover { background: var(--nord3) !important; }

    /* Code blocks */
    #theme-hexo pre, #theme-hexo code,
    #theme-hexo .notion-code, #theme-hexo .notion-inline-code {
      background: var(--nord1) !important; color: var(--nord6) !important;
      border-color: var(--nord2) !important;
    }

    /* Tables / borders */
    #theme-hexo table, #theme-hexo th, #theme-hexo td { border-color: var(--nord3) !important; }

    /* Footer */
    #theme-hexo footer { background: var(--nord0); color: var(--nord5); }

    /* Light-mode fallback (if user forces light) */
    @media (prefers-color-scheme: light){
      #theme-hexo body { background: var(--nord6); color: var(--nord0); }
      #theme-hexo .shadow-card, #theme-hexo .article, #theme-hexo .notion, #theme-hexo .card { background: var(--nord5) !important; color: var(--nord0) !important; }
      #theme-hexo pre, #theme-hexo code, #theme-hexo .notion-code, #theme-hexo .notion-inline-code { background: var(--nord4) !important; color: var(--nord0) !important; }
      #theme-hexo a { color: var(--nord10); } #theme-hexo a:hover { color: var(--nord9); }
    }

    /* Selection + scrollbar Nord touch */
    ::selection { background: color-mix(in srgb, var(--nord8) 28%, transparent); }
    ::-webkit-scrollbar{ width:6px; height:6px; } ::-webkit-scrollbar-thumb{ background: var(--nord3); }
  `}</style>
)


