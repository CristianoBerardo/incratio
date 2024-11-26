// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { createTheme, MantineProvider } from '@mantine/core';
import Body from './Body';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  // primaryColor: 'blue',
  
});

export function App() {
  return <MantineProvider theme={theme}>{<Body />}</MantineProvider>;
}

export default App;
