# Getting Started

## Installation
### node
```bash
npm install @wioenena.q/snowflake # or yarn add @wioenena.q/snowflake
```
```js
const { generateSnowflakeID, parseSnowflakeID } = require("@wioenena.q/snowflake");
```
### deno
```ts
import { generateSnowflakeID, parseSnowflakeID } from "https://raw.githubusercontent.com/wioenena-q/Snowflake/master/src/index.ts";
```

## Usage
```js
const epoch = Date.now();
const workerId = 2;
const processId = 0;

const id = generateSnowflakeID(epoch);
console.log(id);
const parsed = parseSnowflakeID(id);
console.log(parsed);
```
