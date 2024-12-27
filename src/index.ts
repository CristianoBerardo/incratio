import { writeFileSync } from 'fs';
import yahooFinance from 'yahoo-finance2';

const fun = async (): Promise<string>  => {
  const query = 'VWCE.MI';
  const queryOptions = { period1: '2021-02-01' };
  const result = await yahooFinance.chart(query, queryOptions);
  console.log('\nDownloaded all data...\n');
  console.log(result);
  writeFileSync('./src/data/VWCE-MI.json', JSON.stringify(result));
  return 'Write data on file';
};

// console.log(result);

console.log('Hello, world!');
console.log("I'm using nodemon and typescript");
fun().then((res) => console.log(res));

// new ConvertRawData().processData();
