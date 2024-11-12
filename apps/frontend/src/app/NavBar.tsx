import { AppShell, Group, rem, Text } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import Demo from './Demo';
import Logo from './Logo/IR.png';

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
        <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
          <Demo />
          <Demo />
          <Demo />
          <Demo />
          <Demo />
        </AppShell.Main>
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
