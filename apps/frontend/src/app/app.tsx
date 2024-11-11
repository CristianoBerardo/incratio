// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { createTheme, MantineProvider } from '@mantine/core';
import NavBar from './NavBar';
import NxWelcome from './nx-welcome';

const theme = createTheme({
  /** Your theme override here */
});

export function App() {
  return (
    <MantineProvider theme={theme}>
      {
        <>
          <NavBar />
          <NxWelcome title="IncRatio" />
        </>
      }
    </MantineProvider>
  );
}
export default App;
