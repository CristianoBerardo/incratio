// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { createTheme, MantineProvider } from '@mantine/core';
import NavBar from './NavBar';
import Body from './Body';

const theme = createTheme({
  /** Your theme override here */
});

export function App() {
  return <MantineProvider theme={theme}>{<NavBar />}</MantineProvider>;
}
// export function App() {
//   return <MantineProvider theme={theme}>{
//     <Body />
  
  
//   }</MantineProvider>;
// }
export default App;
