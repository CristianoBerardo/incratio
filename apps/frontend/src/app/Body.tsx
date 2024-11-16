import { Space } from '@mantine/core';
import Chart from './Chart';
import NavBar from './NavBar';

export function Body() {
  return (
    <>
      <NavBar />
      <Space h={90} />
      <Chart />
    </>
  );
}
export default Body;
