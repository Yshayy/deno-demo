import { readLines } from "https://deno.land/std/io/bufio.ts";
//import { grantOrThrow } from "https://deno.land/std/permissions/mod.ts"

//data
let devices = [
  {
    type: "lamp",
    state: "on",
    value: 0,
  },
  {
    type: "speaker",
    state: "on",
    value: 100,
  },
];

/** 
Create handlers for smarthome server
*/
export function createHandlers(data: typeof devices) {
  return {
    "listDevices": () => data,
    "switch": (id: string, state: any) => {
      data[parseInt(id)].state = state;
    },
    "setValue": (id: string, val: string) => {
      data[parseInt(id)].value = parseInt(val);
    },
  } as { [key: string]: (...args: any[]) => Promise<any> | any };
}
let handlers = createHandlers(devices);

/** 
Start smart-home server
*/
export async function startServer() {
  const listener = Deno.listen({ port: 8080 });
  console.log("listening on 0.0.0.0:8080");
  let textEncoder = new TextEncoder();
  for await (const conn of listener) {
    let writeLine = (s: string) => conn.write(textEncoder.encode(s + "\n"));
    for await (const line of readLines(conn)) {
      let [command, ...args] = line.split(" ");
      try {
        await writeLine(
          JSON.stringify(await handlers[command](...args)) || "OK",
        );
      } catch (ex) {
        writeLine(`EXCEPTION!!! ${ex}`);
      }
    }
    conn.close();
  }
}
if (import.meta.main) {
  //await grantOrThrow({ name: "net" })

  await startServer();
}
