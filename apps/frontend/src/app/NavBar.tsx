
import Logo from "./Logo/Ir_NavBar_black.png";
import { ThemeIcon } from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';

import { Image } from '@mantine/core';

import { AppShell, Group, rem, Text } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';

export function NavBar() {
  const pinned = useHeadroom({ fixedAt: 120 });

  return (
    <AppShell
      header={{ height: 60, collapsed: !pinned, offset: false }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          {/* <MantineLogo size={30} /> */}
          <img src={Logo} alt="IncRatio" style={{ height: 30 }} />
          <Text size="xl" w={700} style={{ marginLeft: rem(10) }}>
            IncRatio
          </Text>
        </Group>
      </AppShell.Header>
    </AppShell>
  );
}

export default NavBar;