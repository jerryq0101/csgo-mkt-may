// app/providers.tsx
'use client'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import theme from "../theme";
import { ThemeProvider } from '@mui/material/styles';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
                    {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    )
}