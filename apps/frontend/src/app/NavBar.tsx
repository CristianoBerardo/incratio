import { AppShell, Group, Text, UnstyledButton } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import { useRef } from 'react';
import Logo from './Logo/IR.png';

export function NavBar() {
  const pinned = useHeadroom({ fixedAt: 120 });

  const data = new Date().getFullYear();
  const ref = useRef<HTMLButtonElement>(null);

  ref.current?.addEventListener('click', () => {
    console.log('Home clicked' + data);
  });

  const handlerHome = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users');
      // const response = await fetch('http://localhost:3001/api/users', {
      //   mode: 'no-cors',
      //   method: 'GET',
      // });
      //   .catch(function (error) {
      //   console.log('ERROR OCCURRED: ' + error);
      // });
      //   .then(function (response) {
      //     console.log(response);
      //     if (response.ok) {
      //       console.log('Click was recorded');
      //       return;
      //     }
      //     throw new Error('Request failed.');
      //   })
      //   .catch(function (error) {
      //     console.log("ERROR OCCURRED: " + error);
      //   });

      // console.log(response);

      if (!response) {
        throw new Error(`Response status: ${response}`);
      } else {
        const a = response.body?.getReader();
        console.log(a);
        const json = response.body;
        console.log(json);
      }
    } catch (error) {
      console.error('errore' + error);
    }
  };

  return (
    <AppShell
      header={{ height: 70, collapsed: !pinned, offset: false }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="xl">
          <img src={Logo} alt="IncRatio" style={{ height: 30 }} />
          <Text size="xl">IncRatio</Text>

          <span style={{ flex: 1 }} />

          <UnstyledButton onClick={handlerHome}>
            <Text size="lg">Home</Text>
          </UnstyledButton>
          <UnstyledButton>
            <Text size="lg">Tools</Text>
          </UnstyledButton>
          <UnstyledButton>
            <Text size="lg">Docs</Text>
          </UnstyledButton>
          <UnstyledButton>
            <Text size="lg">Next Features</Text>
          </UnstyledButton>
        </Group>
      </AppShell.Header>
    </AppShell>
  );
}

export default NavBar;
