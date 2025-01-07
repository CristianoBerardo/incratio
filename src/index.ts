import { writeFileSync } from 'fs';
import yahooFinance from 'yahoo-finance2';
import { ConvertRawData } from './tools/ConvertRawData';

export const function_get_from_yf = async (): Promise<string> => {
  const query = '^SP500TR';
  const queryOptions = { period1: '1960-01-01' };
  const result = await yahooFinance.chart(query, queryOptions);
  console.log('\nDownloaded all data...\n');
  // console.log(result);
  // writeFileSync('./src/data/VWCE-MI.json', JSON.stringify(result));

  const quotes = result.quotes;

  const res = [];
  for (let i = 0; i < quotes.length; i++) {
    res[i] = {
      date: quotes[i].date.toLocaleDateString(),
      value: quotes[i].adjclose,
    };
  }
  writeFileSync(`./src/data/${query}_adjclose.json`, JSON.stringify(res), {
    flag: 'w',
  });

  return 'Write data on file';
};

// console.log(result);

function_get_from_yf().then((res) => console.log(res));

const convertData = new ConvertRawData();
convertData.readData();
