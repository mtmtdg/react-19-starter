/**
 * 页面路由器 - 用于 Express 提供 SSR 服务时的页面路由控制
 * 本质上是根据不同的 URL 路径，提供不同的页面内容返回
 */
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Provider } from 'jotai';
import { type ReactElement, StrictMode } from 'react';
import { renderToString } from 'react-dom/server';

import { Home } from '@/pages/home.component';
import { Login } from '@/pages/login/login.component';

import { store } from './atoms/store';
import 'dayjs/locale/zh-cn';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        body: {
          margin: 0,
          padding: '20px',
          fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
          lineHeight: 1.5,
        },
      },
    },
  },
});

export function render(url: string) {
  // 简单的条件渲染，不使用路由器
  let component: ReactElement;
  if (url === '/') {
    component = <Home />;
  } else if (url === '/login') {
    component = <Login />;
  } else {
    component = <div>Page not found</div>;
  }

  const html = renderToString(
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='zh-cn'>
            {component}
          </LocalizationProvider>
        </ThemeProvider>
      </Provider>
    </StrictMode>,
  );
  return { html };
}
