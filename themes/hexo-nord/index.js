import React, { createContext, useContext, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { Transition } from '@headlessui/react'

import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import NotionPage from '@/components/NotionPage'
import replaceSearchResult from '@/components/Mark'
import SmartLink from '@/components/SmartLink'
import Comment from '@/components/Comment'
import ShareBar from '@/components/ShareBar'

import ArticleAdjacent from './components/ArticleAdjacent'
import ArticleCopyright from './components/ArticleCopyright'
import { ArticleLock } from './components/ArticleLock'
import ArticleRecommend from './components/ArticleRecommend'
import BlogPostArchive from './components/BlogPostArchive'
import BlogPostListPage from './components/BlogPostListPage'
import BlogPostListScroll from './components/BlogPostListScroll'
import ButtonJumpToComment from './components/ButtonJumpToComment'
import ButtonRandomPostMini from './components/ButtonRandomPostMini'
import Card from './components/Card'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import PostHero from './components/PostHero'
import RightFloatArea from './components/RightFloatArea'
import SearchNav from './components/SearchNav'
import SideRight from './components/SideRight'
import SlotBar from './components/SlotBar'
import TagItemMini from './components/TagItemMini'
import TocDrawer from './components/TocDrawer'
import TocDrawerButton from './components/TocDrawerButton'

import CONFIG from './config'
import { Style } from './style'

const AlgoliaSearchModal = dynamic(() => import('@/components/AlgoliaSearchModal'), { ssr: false })

// Theme-global (kept from Hexo)
const ThemeGlobalHexo = createContext()
export const useHexoGlobal = () => useContext(ThemeGlobalHexo)

/** Base layout (same structure as Hexo, injects Nord <Style/>) */
const LayoutBase = (props) => {
  const { post, children, slotTop, className } = props
  const { onLoading, fullWidth } = useGlobal()
  const router = useRouter()
  const showRandomButton = siteConfig('HEXO_MENU_RANDOM', false, CONFIG)

  const headerSlot = post
    ? <PostHero {...props} />
    : (router.route === '/' && siteConfig('HEXO_HOME_BANNER_ENABLE', null, CONFIG) ? <Hero {...props} /> : null)

  const drawerRight = useRef(null)
  const tocRef = isBrowser ? document.getElementById('article-wrapper') : null

  const floatSlot = (
    <>
      {post?.toc?.length > 1 && (
        <div className='block lg:hidden'>
          <TocDrawerButton onClick={() => drawerRight?.current?.handleSwitchVisible()} />
        </div>
      )}
      {post && <ButtonJumpToComment />}
      {showRandomButton && <ButtonRandomPostMini {...props} />}
    </>
  )

  const searchModal = useRef(null)

  return (
    <ThemeGlobalHexo.Provider value={{ searchModal }}>
      <div id='theme-hexo' className={`${siteConfig('FONT_STYLE')} dark:bg-black scroll-smooth`}>
        {/* Inject Nord globals & accent mapping */}
        <Style />

        {/* Header */}
        <Header {...props} />

        {/* Hero / PostHero */}
        <Transition
          show={!onLoading}
          appear
          enter='transition ease-in-out duration-700 transform order-first'
          enterFrom='opacity-0 -translate-y-16'
          enterTo='opacity-100'
          leave='transition ease-in-out duration-300 transform'
          leaveFrom='opacity-100'
          leaveTo='opacity-0 translate-y-16'
          unmount={false}
        >
          {headerSlot}
        </Transition>

        {/* Main */}
        <main
          id='wrapper'
          className={`${siteConfig('HEXO_HOME_BANNER_ENABLE', null, CONFIG) ? '' : 'pt-16'} bg-hexo-background-gray dark:bg-black w-full py-8 md:px-8 lg:px-24 min-h-screen relative`}
        >
          <div
            id='container-inner'
            className={`${JSON.parse(siteConfig('LAYOUT_SIDEBAR_REVERSE')) ? 'flex-row-reverse' : ''} w-full mx-auto lg:flex lg:space-x-4 justify-center relative z-10`}
          >
            <div className={`${className || ''} w-full ${fullWidth ? '' : 'max-w-4xl'} h-full overflow-hidden`}>
              <Transition
                show={!onLoading}
                appear
                enter='transition ease-in-out duration-700 transform order-first'
                enterFrom='opacity-0 translate-y-16'
                enterTo='opacity-100'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='opacity-100 translate-y-0'
                leaveTo='opacity-0 -translate-y-16'
                unmount={false}
              >
                {slotTop}
                {children}
              </Transition>
            </div>

            {/* Right sidebar */}
            <SideRight {...props} />
          </div>
        </main>

        {/* Mobile TOC drawer */}
        <div className='block lg:hidden'>
          <TocDrawer post={post} cRef={drawerRight} targetRef={tocRef} />
        </div>

        {/* Float actions */}
        <RightFloatArea floatSlot={floatSlot} />

        {/* Site-wide search */}
        <AlgoliaSearchModal cRef={searchModal} {...props} />

        {/* Footer */}
        <Footer title={siteConfig('TITLE')} />
      </div>
    </ThemeGlobalHexo.Provider>
  )
}

/** Home = post list with optional Hero */
const LayoutIndex = (props) => <LayoutPostList {...props} className='pt-8' />

/** Post list (page or infinite) */
const LayoutPostList = (props) => (
  <div className='pt-8'>
    <SlotBar {...props} />
    {siteConfig('POST_LIST_STYLE') === 'page'
      ? <BlogPostListPage {...props} />
      : <BlogPostListScroll {...props} />}
  </div>
)

/** Search */
const LayoutSearch = (props) => {
  const { keyword } = props
  const router = useRouter()
  const currentSearch = keyword || router?.query?.s

  useEffect(() => {
    if (currentSearch) {
      replaceSearchResult({
        doms: document.getElementsByClassName('replace'),
        search: keyword,
        target: { element: 'span', className: 'text-red-500 border-b border-dashed' }
      })
    }
  })

  return (
    <div className='pt-8'>
      {!currentSearch ? <SearchNav {...props} /> : (
        <div id='posts-wrapper'>
          {siteConfig('POST_LIST_STYLE') === 'page'
            ? <BlogPostListPage {...props} />
            : <BlogPostListScroll {...props} />}
        </div>
      )}
    </div>
  )
}

/** Archive */
const LayoutArchive = (props) => {
  const { archivePosts } = props
  return (
    <div className='pt-8'>
      <Card className='w-full'>
        <div className='mb-10 pb-20 bg-white md:p-12 p-3 min-h-full dark:bg-hexo-black-gray'>
          {Object.keys(archivePosts).map((title) => (
            <BlogPostArchive key={title} posts={archivePosts[title]} archiveTitle={title} />
          ))}
        </div>
      </Card>
    </div>
  )
}

/** Post detail */
const LayoutSlug = (props) => {
  const { post, lock, validPassword } = props
  const router = useRouter()
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000

  useEffect(() => {
    if (!post) {
      setTimeout(() => {
        if (isBrowser) {
          const article = document.querySelector('#article-wrapper #notion-article')
          if (!article) router.push('/404').then(() => console.warn('Page not found', router.asPath))
        }
      }, waiting404)
    }
  }, [post])

  return (
    <div className='w-full lg:hover:shadow lg:border rounded-t-xl lg:rounded-xl lg:px-2 lg:py-4 bg-white dark:bg-hexo-black-gray dark:border-black article'>
      {lock && <ArticleLock validPassword={validPassword} />}

      {!lock && post && (
        <div className='overflow-x-auto flex-grow mx-auto md:w-full md:px-5 '>
          <article id='article-wrapper' itemScope itemType='https://schema.org/Movie' className='subpixel-antialiased overflow-y-hidden'>
            <section className='px-5 justify-center mx-auto max-w-2xl lg:max-w-full'>
              {post && <NotionPage post={post} />}
            </section>

            <ShareBar post={post} />

            {post?.type === 'Post' && (
              <>
                <ArticleCopyright {...props} />
                <ArticleRecommend {...props} />
                <ArticleAdjacent {...props} />
              </>
            )}
          </article>

          <div className='pt-4 border-dashed' />

          <div className='duration-200 overflow-x-auto bg-white dark:bg-hexo-black-gray px-3'>
            <Comment frontMatter={post} />
          </div>
        </div>
      )}
    </div>
  )
}

/** 404 */
const Layout404 = () => {
  const router = useRouter()
  const { locale } = useGlobal()

  useEffect(() => {
    setTimeout(() => {
      if (isBrowser) {
        const article = document.querySelector('#article-wrapper #notion-article')
        if (!article) router.push('/')
      }
    }, 3000)
  })

  return (
    <div className='text-black w-full h-screen text-center justify-center content-center items-center flex flex-col'>
      <div className='dark:text-gray-200'>
        <h2 className='inline-block border-r-2 border-gray-600 mr-2 px-3 py-2 align-top'>404</h2>
        <div className='inline-block text-left h-32 leading-10 items-center'>
          <h2 className='m-0 p-0'>{locale.COMMON.NOT_FOUND}</h2>
        </div>
      </div>
    </div>
  )
}

/** Category index */
const LayoutCategoryIndex = (props) => {
  const { categoryOptions } = props
  const { locale } = useGlobal()
  return (
    <div className='mt-8'>
      <Card className='w-full min-h-screen'>
        <div className='dark:text-gray-200 mb-5 mx-3'>
          <i className='mr-4 fas fa-th' /> {locale.COMMON.CATEGORY}:
        </div>
        <div id='category-list' className='duration-200 flex flex-wrap mx-8'>
          {categoryOptions?.map((c) => (
            <SmartLink key={c.name} href={`/category/${c.name}`} passHref legacyBehavior>
              <div className='duration-300 dark:hover:text-white px-5 cursor-pointer py-2 hover:text-indigo-400'>
                <i className='mr-4 fas fa-folder' /> {c.name}({c.count})
              </div>
            </SmartLink>
          ))}
        </div>
      </Card>
    </div>
  )
}

/** Tag index */
const LayoutTagIndex = (props) => {
  const { tagOptions } = props
  const { locale } = useGlobal()
  return (
    <div className='mt-8'>
      <Card className='w-full'>
        <div className='dark:text-gray-200 mb-5 ml-4'>
          <i className='mr-4 fas fa-tag' /> {locale.COMMON.TAGS}:
        </div>
        <div id='tags-list' className='duration-200 flex flex-wrap ml-8'>
          {tagOptions.map((tag) => (
            <div key={tag.name} className='p-2'>
              <TagItemMini key={tag.name} tag={tag} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}

