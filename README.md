# CLI 프로그램 개발 방법 요약



## 1. CLI 프로그램의 기본 구조

CLI(Command Line Interface)는 **사용자가 터미널에 명령어를 입력하면 해당 기능을 실행하는 프로그램**이다.

일반 웹 프로젝트의 Controller처럼 `index.js`가 입력을 받아 적절한 기능을 호출한다.

```text
my-cli/
├── package.json     # CLI 명령어 및 프로젝트 설정
├── index.js         # CLI 진입점, 명령어 처리
└── calculator.js    # 실제 비즈니스 로직
```



## 2. index.js의 역할

**CLI 프로그램의 진입점으로, 터미널 입력을 해석하고 해당 기능을 실행한다.**

```javascript
#!/usr/bin/env node

const { add } = require("./calculator");

// 사용자가 입력한 명령어
const command = process.argv[2];

if (command === "add") {
  const a = Number(process.argv[3]);
  const b = Number(process.argv[4]);

  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    console.error("올바른 숫자를 입력해주세요.");
    process.exit(1);
  }

  console.log(`결과: ${add(a, b)}`);
}
```

- `#!/usr/bin/env node`: Node.js로 실행하도록 지정
- `process.argv`: 터미널에서 전달받은 명령어와 인자
- `console.log()`: 터미널에 결과 출력
- `process.exit(1)`: 오류 발생 시 비정상 종료

**Spring Boot의 Controller와 유사한 역할**이다.



## 3. package.json의 bin과 scripts

```json
{
  "name": "test-cli",
  "version": "1.0.0",
  "bin": {
    "devtool": "./index.js"
  },
  "scripts": {
    "start": "node index.js"
  }
}
```

| 구분 | bin | scripts |
|---|---|---|
| 역할 | CLI 명령어 등록 | npm 실행 명령어 등록 |
| 실행 예시 | `devtool add 10 20` | `npm start` |
| 목적 | 사용자가 직접 CLI 실행 | 개발·빌드·테스트 등의 작업 실행 |

**bin**은 `devtool`이라는 명령어를 `index.js`와 연결한다.

**scripts**는 `npm start`를 실행할 때 `node index.js`를 실행하도록 설정한다.

## 4. 각 파일의 역할

| 파일 | 역할 | 웹 프로젝트 비유 |
|---|---|---|
| `package.json` | npm 패키지 및 실행 설정 | Gradle 설정 파일 |
| `index.js` | 명령어 파싱, 입력 검증, 결과 출력 | Controller |
| `calculator.js` | 실제 계산 기능 구현 | Service |

`calculator.js` 예시:

```javascript
function add(a, b) {
  return a + b;
}

module.exports = { add };
```

기능 로직을 분리하면 CLI뿐 아니라 MCP 서버에서도 동일한 함수를 재사용할 수 있다.



## 5. 프로젝트 생성 및 실행

**① 프로젝트 생성**

```bash
mkdir my-cli
cd my-cli
npm init -y
```

**② 파일 작성**

`index.js`, `calculator.js`를 생성하고 `package.json`에 `bin`을 설정한다.

**③ CLI 실행 권한 부여 및 연결 (Ubuntu)**

```bash
chmod +x index.js
npm link
```

**④ 실행**

```bash
devtool add 10 20
```

출력:

```text
결과: 30
```



## 핵심 정리

```text
사용자: devtool add 10 20
             ↓
package.json의 bin
  → devtool 명령어와 index.js 연결
             ↓
index.js
  → 명령어 해석 및 입력값 검증
             ↓
calculator.js
  → add(10, 20) 실행
             ↓
index.js
  → console.log()으로 결과 출력
             ↓
터미널: 결과 30
```

**CLI 개발의 핵심은 `package.json`에서 실행 명령어를 등록하고, `index.js`에서 사용자 입력을 해석하고, 별도 모듈에서 실제 기능을 수행하도록 역할을 분리하는 것이다.**



## 실행 가능 명령어
```
devtool hello 정민
```
출력: 안녕하세요, 정민님!

```
devtool add 10 20 
```
출력: 계산 결과: 30 