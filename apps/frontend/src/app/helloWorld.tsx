import { Calendar, DatePicker, DatesProvider } from '@mantine/dates';
import '@mantine/dates/styles.css';

export function helloWorld() {

  // return (
  //   <h1>Hello, World!</h1>
  // )
  

  // return (
  //   <DatesProvider settings={{ consistentWeeks: true }}>
  //     <DatePicker />
  //   </DatesProvider>
  // );

  return (
    <Calendar />
  )
}

export default helloWorld;
