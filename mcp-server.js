const { add } = require("./calculator");

async function main() {
    const { McpServer } = await import("@modelcontextprotocol/server");
    const { StdioServerTransport } = await import("@modelcontextprotocol/server/stdio");
    const z = await import("zod/v4");

    // 1. MCP 서버 생성
    const server = new McpServer({
        name: "my-calculator",
        version: "1.0.0"
    });

    // 2. AI가 호출할 도구 등록
    server.registerTool(
        "add",
        {
            description: "두 숫자를 더합니다.",
            inputSchema: z.object({
                a: z.number(),
                b: z.number()
            })
        },
        async({a,b}) => {
            // 3. 기존 계산 함수 재사용 
            const result = add(a,b);

            return {
                content: [
                    {
                        type: "text",
                        text: String(result)
                    }
                ]
            };
        }
    );

    // 4. Codex와 표준 입출력으로 연결 
    // Codex랑 MCP 서버가 stdin과 stdout을 통해 통신하도록 연결 
    const transport = new StdioServerTransport();
    await server.connect(transport);

}

// MCP 서버 내부에서 일반 로그를 출력할때는 console.error()를 사용해야 MCP 통신 데이터와 섞이지 않음 
main().catch((error)=>{
    console.error(error);
    process.exitCode = 1; 
});