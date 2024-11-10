// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import NxWelcome from './nx-welcome';
import HelloWorld from './helloWorld';




import { createTheme, MantineProvider } from '@mantine/core';
import Demo from './Demo';
import NavBar from './NavBar';


const theme = createTheme({
  /** Your theme override here */
});

export function App() {
  return (
    <MantineProvider theme={theme}>
      {
        <>
          <NavBar />
          <NxWelcome title = "IncRatio"/>
          <Demo />
        </>
      }
    </MantineProvider>
  );
}

// export function App() {
//   return (
//     <div>
//       <NxWelcome title="frontend" />
//     </div>

//     // <HelloWorld />

    
      
    
//   );
// }

export default App;
