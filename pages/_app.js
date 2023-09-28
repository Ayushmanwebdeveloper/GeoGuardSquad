import { SessionProvider } from 'next-auth/react'
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import createEmotionCache from '../custom-modules/createEmotionCache';
import lightTheme from '../styles/theme/lightTheme';
import '../styles/globals.css';
const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, pageProps, emotionCache = clientSideEmotionCache }) {

    return (
        <SessionProvider session={pageProps.session}>
            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={lightTheme}>
                    <Component {...pageProps} />
                </ThemeProvider>
            </CacheProvider>
        </SessionProvider>
    )
}