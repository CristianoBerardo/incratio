import { BarChart, LineChart } from '@mantine/charts';
import {
  Autocomplete,
  Button,
  Card,
  Center,
  Combobox,
  Space,
  Text,
  TextInput,
  useCombobox,
} from '@mantine/core';

import { useEffect, useState } from 'react';

interface dataTypes {
  date: string;
  'Non-Annualized': number;
  Annualized: number;
}

const indexes = ['S&P 500', 'VWCE', 'EQQQ'];

function ChartAndComboBox({
  w,
  data,
  arrayOfIndexes,
}: {
  w: number;
  data: {
    date: string;
    'Non-Annualized': string;
    Annualized: string;
  }[];
  arrayOfIndexes: string[];
}) {
  const [selectedProduct, setSelectedProduct] = useState([]);

  // const handleProductSelection = (product) => {
  //   setSelectedProduct(product);
  // };

  return {
    /* <ComboBoxTarget
        onProductSelect={handleProductSelection}
        arrayOfIndexes={arrayOfIndexes}
        w={w + 250}
      />
      <ChartMantine selectedProduct={selectedProduct} array_analysis={data} /> */
  };
}

function ChartMantine({
  array_analysis,
}: // selectedProduct,
{
  array_analysis: {
    date: string;
    'Non-Annualized': string;
    Annualized: string;
  }[];
  // selectedProduct:  {
  // date: string;
  // 'Non-Annualized': string;
  // Annualized: string;
  // }[];
}) {
  return (
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
  );
}

function ComboBoxTarget({
  // onProductSelect,
  arrayOfIndexes,
  w,
}: {
  arrayOfIndexes: string[];
  w: number;
  // onProductSelect: (product: string) => void;
}) {
  const combobox = useCombobox();
  const [value, setValue] = useState('');
  const [analysys, setAnalysis] = useState([]);
  const shouldFilterOptions = !arrayOfIndexes.some((item) => item === value);
  const filteredOptions = shouldFilterOptions
    ? arrayOfIndexes.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase().trim())
      )
    : indexes;

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  const getRequest = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users', {
        method: 'GET',
      });

      if (!response) {
        throw new Error(`Response status: ${response}`);
      } else {
        const json = await response.json();
        setAnalysis(json);
        console.log('required data from backend and create graphs');
      }
    } catch (error) {
      console.error('errore' + error);
    }
  };

  // const [selectedProduct, setSelectedProduct] = useState([]);

  // const handleProductSelect = (event) => {
  //   const selectedProduct = event.target.value; // Adjust based on your component's event handling
  //   setSelectedProduct(selectedProduct);
  //   onProductSelect(selectedProduct);
  // };

  return (
    <>
      <ChartMantine array_analysis={analysys} />
      {/* <select value={selectedProduct} onChange={handleProductSelect}></select> */}

      <Combobox
        onOptionSubmit={(optionValue) => {
          setValue(optionValue);
          getRequest();
          combobox.closeDropdown();
        }}
        store={combobox}
      >
        <Combobox.Target>
          <TextInput
            label="Pick value or type anything"
            placeholder="Pick value or type anything"
            value={value}
            w={w}
            onChange={(event) => {
              setValue(event.currentTarget.value);
              combobox.openDropdown();
              combobox.updateSelectedOptionIndex();
            }}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => combobox.closeDropdown()}
          />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {options.length === 0 ? (
              <Combobox.Empty>Nothing found</Combobox.Empty>
            ) : (
              options
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
}

function Chart() {
  const [array_analysis, setArray_analysis] = useState([]);
  const [histogram, setHistogram] = useState([]);

  const [isin, setIsin] = useState<string[]>([]);

  useEffect(() => {
    const fetchIsin = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/getisin', {
          method: 'GET',
        });
        const json = await response.json();
        setIsin(json.isin);
      } catch (error) {
        console.error('errore' + error);
      }
    };

    fetchIsin();
  }, []);

  const handlerHome = async () => {
    try {
      // const response = await fetch('http://localhost:3001/api/sp500', {
      //   method: 'POST',
      // });
      const response = await fetch('http://localhost:3001/api/getsp500json', {
        method: 'GET',
      });

      if (!response) {
        throw new Error(`Response status: ${response}`);
      } else {
        const json = await response.json();
        setArray_analysis(json.array_analysis);
        setHistogram(json.histogram);
        console.log('required data from backend and create graphs');
      }
    } catch (error) {
      console.error('errore' + error);
    }
  };

  const reset = () => {
    setArray_analysis([]);
    setHistogram([]);
  };

  return (
    <>
      <Center>
        {/* <Card shadow="sm" padding="lg" radius="lg" withBorder={true} w="95%"> */}
        <Autocomplete
          size="sm"
          radius="md"
          placeholder="Insert an ISIN"
          limit={5}
          data={isin}
          comboboxProps={{
            transitionProps: { transition: 'scale', duration: 200 },
            shadow: 'md',
          }}
        />
        <Center>
          <Button onClick={handlerHome} w={230}>
            <Text size="lg">Get sp500 graph</Text>
          </Button>
          <Space w={10} />
          <Button onClick={reset} w={230}>
            <Text size="lg">reset</Text>
          </Button>
        </Center>
        {/* </Card> */}
      </Center>
      <Center>
        <Card shadow="sm" padding="lg" radius="lg" withBorder={true} w="95%">
          <Text mb="md" pl="md">
            Total:
          </Text>

          {/* <ChartMantine array_analysis={array_analysis} /> */}

          {/* <Space h={10} />
        <Center>
          <ComboBoxTarget arrayOfIndexes={indexes} w={230} />
        </Center>
        <Space h={10} /> */}

          {/* <ChartAndComboBox
          w={230}
          data={array_analysis}
          arrayOfIndexes={indexes}
        /> */}

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
            Annual Adjusted (CAGR):
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
            Yield distribution:
          </Text>
          <BarChart
            h={300}
            data={histogram}
            dataKey="range"
            series={[{ name: 'count', color: 'blue' }]}
            yAxisProps={{ domain: [0, 1100] }}
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
          {/*         
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
        /> */}
        </Card>
      </Center>
    </>
  );
}

export default Chart;
