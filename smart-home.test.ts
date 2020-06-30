import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { createHandlers } from "./smart-home.ts";

Deno.test("switchOn", async () => {
  let data = [
    {
      type: "lamp",
      state: "on",
      value: 0,
    },
  ];
  let handlers = createHandlers(data);
  await handlers["switch"](0, "off");
  assertEquals(data[0].state, "off");
});
