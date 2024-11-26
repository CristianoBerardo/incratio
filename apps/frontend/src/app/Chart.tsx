import { AreaChart, BarChart, LineChart } from '@mantine/charts';
import { Button, Card, Center, Text } from '@mantine/core';
import { histogram } from './sp500_smaller';

import { useState } from 'react';

interface dataTypes {
  date: string;
  'Non-Annualized': number;
  Annualized: number;
}

function Chart() {
  const [array_analysis, setArray_analysis] = useState([]);

  const handlerHome = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users', {
        method: 'GET',
      });

      if (!response) {
        throw new Error(`Response status: ${response}`);
      } else {
        const json = await response.json();
        setArray_analysis(json);
        console.log('required data from backend and create graphs');
      }
    } catch (error) {
      console.error('errore' + error);
    }
  };

  const reset = () => {
    setArray_analysis([]);
  };

  return (
    <Center>
      <Card shadow="sm" padding="lg" radius="lg" withBorder={true} w="95%">
        <Text mb="md" pl="md">
          Total:
        </Text>

        <Button onClick={handlerHome}>
          <Text size="lg">Get sp500 graph</Text>
        </Button>
        <Button onClick={reset}>
          <Text size="lg">reset</Text>
        </Button>

        <LineChart
          h={500}
          data={array_analysis}
          dataKey="date"
          series={[{ name: 'Non-Annualized', color: 'indigo.6' }]}
          curveType="linear"
          connectNulls={false}
          withDots={false}
          unit="%"
          // type="split"
          withLegend
          yAxisProps={{ domain: [-50, 450] }}
          lineChartProps={{ syncId: 'date' }}
          referenceLines={[{ y: 0, label: 'Zero', color: 'red.6' }]}
          //withGradient = {false}
          // h={300}
          // data={data}
          // dataKey="date"
          // series={[{ name: 'Apples', color: 'indigo.6' }]}
          // curveType="linear"
        />
        <Text mb="md" pl="md" mt="xl">
          Annual Adjusted:
        </Text>
        <LineChart
          h={500}
          data={array_analysis}
          dataKey="date"
          series={[{ name: 'Annualized', color: 'indigo.6' }]}
          curveType="linear"
          connectNulls={false}
          withDots={false}
          unit="%"
          withLegend
          yAxisProps={{ domain: [-10, 20] }}
          lineChartProps={{ syncId: 'date' }}
          referenceLines={[{ y: 0, label: 'Zero', color: 'red.6' }]}
          //withGradient = {false}
          // h={300}
          // data={data}
          // dataKey="date"
          // series={[{ name: 'Apples', color: 'indigo.6' }]}
          // curveType="linear"
        />
        <Text mb="md" pl="md" mt="xl">
          Histogram:
        </Text>
        <BarChart
          h={300}
          data={histogram}
          dataKey="range"
          series={[{ name: 'count', color: 'blue' }]}
          yAxisProps={{ domain: [0, 30] }}
          referenceLines={[
            {
              x: 2,
              color: 'red.5',
              label: 'Profit reached',
              labelPosition: 'insideTopRight',
            },
          ]}
          gridAxis="xy"
          type="default"
          orientation="horizontal"
          withBarValueLabel
        />
        <Text mb="md" pl="md">
          Total:
        </Text>
        <AreaChart
          h={500}
          data={array_analysis}
          dataKey="date"
          series={[{ name: 'Non-Annualized', color: 'indigo.6' }]}
          curveType="linear"
          connectNulls={false}
          withDots={false}
          unit="%"
          type="split"
          withLegend
          fillOpacity={0.1}
          areaChartProps={{ syncId: 'date' }}
          yAxisProps={{ domain: [-50, 460] }}
          // lineChartProps={{ syncId: 'sp500' }}
          // referenceLines={[{ y: 0, label: 'Zero', color: 'red.6' }]}
          //withGradient = {false}
          // h={300}
          // data={data}
          // dataKey="date"
          // series={[{ name: 'Apples', color: 'indigo.6' }]}
          // curveType="linear"
        />
        <Text mb="md" pl="md" mt="xl">
          Annual Adjusted:
        </Text>
        <AreaChart
          h={500}
          data={array_analysis}
          dataKey="date"
          series={[{ name: 'Annualized', color: 'indigo.6' }]}
          curveType="linear"
          connectNulls={false}
          withDots={false}
          unit="%"
          withLegend
          yAxisProps={{ domain: [-7, 20] }}
          type="split"
          fillOpacity={0.1}
          areaChartProps={{ syncId: 'groceries' }}
          // lineChartProps={{ syncId: 'sp500' }}
          // referenceLines={[{ y: 0, label: 'Zero', color: 'red.6' }]}
          //withGradient = {false}
          // h={300}
          // data={data}
          // dataKey="date"
          // series={[{ name: 'Apples', color: 'indigo.6' }]}
          // curveType="linear"
        />
        <Text mb="md" pl="md">
          Total:
        </Text>
        <AreaChart
          h={500}
          data={array_analysis}
          dataKey="date"
          series={[{ name: 'Non-Annualized', color: 'indigo.6' }]}
          curveType="linear"
          connectNulls={false}
          withDots={false}
          unit="%"
          type="stacked"
          withLegend
          fillOpacity={0.3}
          areaChartProps={{ syncId: 'groceries' }}
          withGradient={true}
          // yAxisProps={{ domain: [-50, 460] }}
          // lineChartProps={{ syncId: 'sp500' }}
          // referenceLines={[{ y: 0, label: 'Zero', color: 'red.6' }]}
          //withGradient = {false}
          // h={300}
          // data={data}
          // dataKey="date"
          // series={[{ name: 'Apples', color: 'indigo.6' }]}
          // curveType="linear"
        />
        <Text mb="md" pl="md" mt="xl">
          Annual Adjusted:
        </Text>
        <AreaChart
          h={500}
          data={array_analysis}
          dataKey="date"
          series={[{ name: 'Annualized', color: 'indigo.6' }]}
          curveType="linear"
          connectNulls={false}
          withDots={false}
          unit="%"
          withLegend
          type="stacked"
          fillOpacity={0.3}
          areaChartProps={{ syncId: 'groceries' }}
          yAxisProps={{ domain: [-10, 20] }}
          withGradient={true}
          // lineChartProps={{ syncId: 'sp500' }}
          // referenceLines={[{ y: 0, label: 'Zero', color: 'red.6' }]}
          //withGradient = {false}
          // h={300}
          // data={data}
          // dataKey="date"
          // series={[{ name: 'Apples', color: 'indigo.6' }]}
          // curveType="linear"
        />
      </Card>
    </Center>
  );
}

export default Chart;
