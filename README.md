# Getting Started

## Installation
### node
```bash
npm install @wioenena.q/snowflake # or yarn add @wioenena.q/snowflake
```
CommonJS
```js
const { Snowflake } = require("@wioenena.q/snowflake");
```
ESM
```js
import { Snowflake } from "@wioenena.q/snowflake";
```
### deno
```ts
import { Snowflake } from "https://raw.githubusercontent.com/wioenena-q/Snowflake/master/src/index.ts";
```

## Usage
```js
const epoch = Date.now();
const workerId = 1;
const processId = 1;

const snowflake = new Snowflake(epoch);
const id = snowflake.generate(workerId, processId);
console.log(id);
const parsed = parseSnowflakeID(id);
console.log(parsed);
```


# References
- [Twitter-Archive](https://github.com/twitter-archive/snowflake)
- [Discord](https://discord.com/developers/docs/reference#snowflakes)