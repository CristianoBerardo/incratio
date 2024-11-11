import { AppShell, Group, rem, Text } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import Logo from './Logo/IR.png';
import Demo from './Demo';

export function NavBar() {
  const pinned = useHeadroom({ fixedAt: 120 });

  const data = new Date().getFullYear();

  return (
    <AppShell
      header={{ height: 60, collapsed: !pinned, offset: false }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <img src={Logo} alt="IncRatio" style={{ height: 30 }} />
          <Text size="xl" w={700} style={{ marginLeft: rem(10) }}>
            IncRatio
          </Text>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Demo />
        <Demo />
        <Demo />

        <Demo />

        <Demo />
      </AppShell.Main>
      <AppShell.Footer>
        <Text size="xs" style={{ textAlign: 'center' }}>
          © {data} IncRatio
        </Text>
        <Text size="xs" style={{ textAlign: 'center' }}>
          All rights reserved
        </Text>
      </AppShell.Footer>
    </AppShell>
  );
}

export default NavBar;
