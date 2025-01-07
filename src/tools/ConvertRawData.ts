import fs from 'fs';
import path from 'path';
export class ConvertRawData {
  private readonly nameFile = `./src/data/sp500_analisys.json`;
  private analysis = '{"array_analysis" : [';
  private readonly values: number[] = [];
  private readonly totalMarketDays = 262; // coletti approuved
  private readonly rollingYears = 10;

  private readonly path = path.resolve(
    __dirname,
    '../data/sp500TR-data_adjclose.json'
  );

  private data;

  public async readData() {
    const filePath = path.resolve(
      __dirname,
      '../data/sp500TR-data_adjclose.json'
    );

    try {
      const data = await fs.readFileSync(filePath);
      const jsonData = JSON.parse(data.toString('utf-8'));
      this.data = jsonData;
      // console.log(this.data);
    } catch (err) {
      console.error(err);
    }

    this.processData();
  }

  // ! NOTA video Coletti https://www.youtube.com/watch?v=9v4WXMm5lxk&ab_channel=PaoloColetti 24:00 min Prova a vedere se puoi usare i rendimenti logaritmici (li sommi) cosa vietatissima con i rendimenti percentuali (10% + 10% != 20%)
  // ! Poi basta riconvertirlia in percentuale con la formula 100 * (e^r - 1) dove r è il rendimento logaritmico <- copilot da prendere con le pinze

  // ! NOTA https://open.spotify.com/episode/0ogWJzr5n543bsVXAT3qsd?si=504897bef4a945ab la volatilità (calcolata nella finanza classica come sqrt() (varianza) ), non è molto adatta in quanto
  // ! nella statistica questa significa avere una gaussiana normale cosa che in finanza non è possibile in quanto abbiamo il fenomeno delle "fat tails" cioè eventi estremi che non sono previsti ma che possono accadere.
  public processData() {
    let i: number, j: number;
    for (
      i = 0, j = this.totalMarketDays * this.rollingYears;
      i < this.data.length - 1, j < this.data.length - 1;
      i++, j++
    ) {
      const first = parseInt(this.data[i].value.toString(), 10);
      const inc = this.percIncrease(first, +this.data[j].value);
      const incAnn = this.annualizedReturn(inc, 10);

      this.values.push(incAnn);

      this.analysis += `{\n\t"date" : "${this.data[j].date}", \n\t"Non-Annualized": "${inc}", \n\t"Annualized": "${incAnn}"\n},\n`;
      // }
    }
    const first = parseInt(this.data[i].value.toString(), 10);
    const inc = this.percIncrease(first, +this.data[j].value);
    const incAnn = this.annualizedReturn(inc, 10);

    this.values.push(incAnn);

    this.analysis += `{\n\t"date" : "${this.data[j].date}", \n\t"Non-Annualized": "${inc}", \n\t"Annualized": "${incAnn}"\n}\n`;

    this.values.sort((a, b) => a - b);

    const ranges = 1;
    const bins = this.histogram(this.values, ranges);

    fs.appendFile(
      `${this.nameFile}`,
      this.analysis + '],',
      { flag: 'w' },
      (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Data written to file');
        }
      }
    );

    let hist = '"histogram" : [';

    let count = 0;
    let index: number;
    for (index = 0; index < bins.length - 1; index++) {
      hist += `\n{\n\t"range" : "[${
        Math.ceil(this.values[0]) + count * ranges
      }% - ${
        Math.ceil(this.values[0]) + (count + 1) * ranges
      }%)", \n\t"count": "${bins[index]}"\n},\n`;
      count++;
    }

    hist += `\n{\n\t"range" : "[${
      Math.ceil(this.values[0]) + count * ranges
    }% - ${
      Math.ceil(this.values[0]) + (count + 1) * ranges
    }%)", \n\t"count": "${bins[index]}"\n}\n`;

    fs.appendFile(`${this.nameFile}`, hist + ']}', { flag: 'a' }, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Data written to file');
      }
    });
  }

  public histogram(X: number[], binRange: number) {
    //inclusive of the first number
    const max = X[X.length - 1];
    const min = X[0];
    const len = max - min + 1;
    const numberOfBins = Math.ceil(len / binRange);
    const bins = new Array(numberOfBins).fill(0);
    //-min to normalise values for the array
    X.forEach((x) => bins[Math.floor((x - min) / binRange)]++);
    return bins;
  }

  private annualizedReturn(percent: number, years: number) {
    return (
      Math.round((Math.pow(1 + percent / 100, 1 / years) - 1) * 10000) / 100
    );
  }

  private percIncrease(a: number, b: number) {
    let percent: number;
    if (b !== 0) {
      if (a !== 0) {
        percent = (b / a - 1) * 100;
      } else {
        percent = b * 100;
      }
    } else {
      percent = -a * 100;
    }
    return Math.round(percent * 100) / 100;
  }
}
