import benchmark from 'benchmark';

const suite = new benchmark.Suite;

const a = 1000;
const b = 2000;

let result = 0; // eslint-disable-line no-unused-vars

suite
  .add('Benchmark Description 1', () => {
    result = a + b;
  })
  .add('Benchmark Description 2', () => {
    result = ((a * 1000) / 1000) + ((b * 1000) / 1000);
  })
  // add listeners
  .on('cycle', event => {
    console.log(String(event.target)); // eslint-disable-line no-console
  })
  .on('complete', function() {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`); // eslint-disable-line no-console
  })
  // run async
  .run({async: true});
