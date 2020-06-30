const client = await Deno.connect({ port: 8080 });

await Promise.all([
  Deno.copy(Deno.stdin, client),
  Deno.copy(client, Deno.stdout),
]);
