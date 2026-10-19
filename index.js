#!/usr/bin/env node 

const { add, subtract } = require("./calculator");

const command = process.argv[2];

if ( command === "hello") {
    const name = process.argv[3];
    console.log(`안녕하세요, ${name}님!`);
} else if (command === "add") {
  const a = Number(process.argv[3]);
  const b = Number(process.argv[4]);

  if(!a || !b) {
    console.error("오류: 숫자 2개 아님");
    process.exit(1);
  }

  const inputA = Number(a);
  const inputB = Number(b);

  if(Number.isNaN(inputA) || Number.isNaN(inputB)) {
    console.error("오류: 숫자만 입력");
    process.exit(1);
  }

  console.log(`계산 결과: ${add(a, b)}`);
} else if (command === "sub") {
    const a = Number(process.argv[3]);
    const b = Number(process.argv[4]);

    console.log(`계산 결과: ${subtract(a, b)}`);
} else {
  console.log("알 수 없는 명령어입니다.");
}