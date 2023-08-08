'use client'
import Layout from '@/components/layouts/Layout';
import { Inter } from 'next/font/google'
import Script from 'next/script';
import { usePathname } from 'next/navigation';
// import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import { store } from '@/store';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: any) {
  const pathName = usePathname();
  const routesToHide = ['/login', '/forgot-password'];
  const hideLayout = routesToHide.includes(pathName);

  return (
    <html lang="zxx">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>The Miracle</title>

        <link rel="stylesheet" type="text/css" href="assets/css/fonts.css" />
        <link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="assets/css/font-awesome.min.css" />
        <link rel="stylesheet" type="text/css" href="assets/js/plugins/swiper/css/swiper.min.css" />
        <link rel="stylesheet" type="text/css" href="assets/js/plugins/nice_select/nice-select.css" />
        <link rel="stylesheet" type="text/css" href="assets/js/plugins/player/volume.css" />
        <link rel="stylesheet" type="text/css" href="assets/js/plugins/scroll/jquery.mCustomScrollbar.css" />
        <link rel="stylesheet" type="text/css" href="assets/css/style.css" />

      </head>
      <body id={inter.toString()} className={`${inter.className} crm_body_bg `}>
        {/* {
            hideLayout ?
            children
              :
              <Layout>
              {children}
              </Layout>
            } */}
        <Provider store={store}>
          <Layout>
            {children}
          </Layout>

        </Provider>

        <Script type="text/javascript" src="assets/js/jquery.min.js"></Script>
        <Script type="text/javascript" src="assets/js/bootstrap.min.js"></Script>
        <Script type="text/javascript" src="assets/js/plugins/swiper/js/swiper.min.js"></Script>
        <Script type="text/javascript" src="assets/js/plugins/player/jplayer.playlist.min.js"></Script>
        <Script type="text/javascript" src="assets/js/plugins/player/jquery.jplayer.min.js"></Script>
        <Script type="text/javascript" src="assets/js/plugins/player/audio-player.js"></Script>
        <Script type="text/javascript" src="assets/js/plugins/player/volume.js"></Script>
        <Script type="text/javascript" src="assets/js/plugins/nice_select/jquery.nice-select.min.js"></Script>
        <Script type="text/javascript" src="assets/js/plugins/scroll/jquery.mCustomScrollbar.js"></Script>
        <Script type="text/javascript" src="assets/js/custom.js"></Script>

      </body>
    </html>
  )
}
