#!/usr/bin/env node

import minimist from "minimist";
import dayjs from "dayjs";
import arraySupport from "dayjs/plugin/arraySupport.js";
import chunk from "lodash/chunk.js";

dayjs.extend(arraySupport);

function createHeaderLines(year, month) {
  return [`      ${month + 1}月 ${year}`, "日 月 火 水 木 金 土"];
}

function createBodyLines(year, month) {
  const firstDate = dayjs([year, month, 1]);
  const paddingDays = Array(firstDate.day());
  const fullDays = [
    ...paddingDays,
    ...Array.from({ length: firstDate.daysInMonth() }, (_, i) => i + 1),
  ];
  return chunk(fullDays, 7).map((days) => {
    return days.map((day) => String(day ?? "").padStart(2, " ")).join(" ");
  });
}

function generateCalendarLines(year, month) {
  return [...createHeaderLines(year, month), ...createBodyLines(year, month)];
}

const options = minimist(process.argv.slice(2));
const now = dayjs();
const year = "y" in options ? options.y : now.year();
const month = "m" in options ? options.m - 1 : now.month();
const calendar = generateCalendarLines(year, month);
console.log(calendar.join("\n"));
