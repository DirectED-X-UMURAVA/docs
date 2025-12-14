import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import '@/styles.css'
import { ReactNode } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { generateMetadata } from './utils/metadata'
import { FaXTwitter } from 'react-icons/fa6'
import { FaTelegramPlane, FaGithub } from 'react-icons/fa'
import { BsCalendarWeek } from 'react-icons/bs'
import { ActiveJourneyProvider } from '@/contexts/ActiveJourneyContext'

/* ============================
   ICON STYLING
============================ */

const iconClasses =
  'w-5 h-5 text-gray-600 dark:text-gray-400 transition-all duration-300 hover:scale-110'

const hoverColorClasses = [
  'hover:text-prisma-a',
  'hover:text-prisma-b',
  'hover:text-prisma-c',
  'hover:text-prisma-d',
]

// Random hover color (hydration warning already suppressed at <html>)
const getRandomHoverColor = () =>
  hoverColorClasses[Math.floor(Math.random() * hoverColorClasses.length)]

type IconProps = React.SVGProps<SVGSVGElement>

/* ============================
   CUSTOM ICON
============================ */

const OpenCollectiveIcon = ({ style, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="currentColor"
    viewBox="0 0 16 16"
    style={style}
    {...props}
  >
    <path
      fillOpacity=".4"
      d="M12.995 8.195c0 .937-.312 1.912-.78 2.693l1.99 1.99c.976-1.327 1.6-2.966 1.6-4.683 0-1.795-.624-3.434-1.561-4.76l-2.068 2.028c.468.781.78 1.679.78 2.732z"
    />
    <path d="M8 13.151a4.995 4.995 0 1 1 0-9.99c1.015 0 1.951.273 2.732.82l1.95-2.03a7.805 7.805 0 1 0 .04 12.449l-1.951-2.03a5.07 5.07 0 0 1-2.732.781z" />
  </svg>
)

/* ============================
   STICKY WHITE NAVBAR
============================ */

const navbar = (
  <div className="sticky top-0 z-50 bg-white dark:bg-neutral-900 shadow-sm">
    <Navbar
      className="bg-white dark:bg-neutral-900"
      logo={
        <div className="flex items-center">
          <img
            src="/logodesign.png"
            alt="Prisma Events Logo"
            className="h-20 w-auto object-contain"
          />
        </div>
      }
      logoLink="https://umurava.africa/"
      chatIcon={
        <FaTelegramPlane
          className={`${iconClasses} ${getRandomHoverColor()}`}
        />
      }
      chatLink="https://t.me/+9-UF8k9H8dBjNWFk"
      projectLink="https://github.com/prisma-collective/"
      projectIcon={
        <FaGithub className={`${iconClasses} ${getRandomHoverColor()}`} />
      }
    >
      <div className="inline-flex items-center gap-4">
        <FaXTwitter className={`${iconClasses} ${getRandomHoverColor()}`} />
        <OpenCollectiveIcon
          className={`${iconClasses} ${getRandomHoverColor()}`}
        />
        <BsCalendarWeek
          className={`${iconClasses} ${getRandomHoverColor()}`}
        />
      </div>
    </Navbar>
  </div>
)

/* ============================
   FOOTER
============================ */

const footer = (
  <Footer>Prisma © {new Date().getFullYear()}</Footer>
)

/* ============================
   ROOT LAYOUT
============================ */

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ mdxPath?: string[] }>
}) {
  const resolvedParams = await params
  const metadata = await generateMetadata({ params: resolvedParams })

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

        {/* OpenGraph */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta
          property="og:description"
          content={metadata.openGraph.description}
        />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta
          property="og:image"
          content={metadata.openGraph.images[0].url}
        />

        {/* Twitter */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta
          name="twitter:description"
          content={metadata.twitter.description}
        />
        <meta
          name="twitter:image"
          content={metadata.twitter.images[0]}
        />
      </Head>

      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/prisma-collective/docs"
          footer={footer}
          sidebar={{ autoCollapse: true, defaultMenuCollapseLevel: 1 }}
          editLink={null}
          nextThemes={{ defaultTheme: 'dark' }}
        >
          <ActiveJourneyProvider>{children}</ActiveJourneyProvider>
          <Analytics />
        </Layout>
      </body>
    </html>
  )
}
