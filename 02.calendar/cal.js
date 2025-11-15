#!/usr/bin/env node

import minimist from "minimist";
import dayjs from "dayjs";

const options = minimist(process.argv.slice(2));
const now = dayjs();
const year = "y" in options ? options.y : now.year();
const month = "m" in options ? options.m - 1 : now.month();
const calendar = generateCalendarLines(year, month);
console.log(calendar.join("\n"));

function generateCalendarLines(year, month) {
  return [...header(year, month), ...body(year, month)];
}

function header(year, month) {
  return [`      ${month + 1}月 ${year}`, "日 月 火 水 木 金 土"];
}

function body(year, month) {
  const first = dayjs().year(year).month(month).date(1);
  const blanks = Array.from({ length: first.day() }, () => null);
  const daysInMonth = first.daysInMonth();
  const fullDays = [
    ...blanks,
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  const format = function (n) {
    return String(n ?? "").padStart(2, " ");
  };
  const eachSlice = function (array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };
  return eachSlice(fullDays, 7).map(function (days) {
    return days.map(format).join(" ");
  });
}
