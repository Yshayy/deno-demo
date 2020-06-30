deno run https://deno.land/std/examples/welcome.ts
deno run https://deno.land/std/examples/chat/server.ts
deno run --allow-net https://deno.land/std/examples/chat/server.ts

deno run rx-example.ts
deno bundle rx-example.ts rx-example-dist.js
deno fmt
deno test

cat ./rx-example.ts
wget -O- https://deno.land/std/examples/cat.ts
deno run  --allow-read https://deno.land/std/examples/cat.ts rx-example.ts
deno install -f --name=cat2  --allow-read https://deno.land/std/examples/cat.ts
cat2 rx-example.ts

deno run smart-home.ts
deno run --allow-net smart-home.ts
deno run --allow-net=0.0.0.0:8081  smart-home.ts
deno run --allow-net=0.0.0.0:8080  smart-home.ts
deno run --unstale  smart-home.ts
deno run --allow-net  smart-home.ts

deno info smart-home.ts
deno cache smart-home.ts
deno cache --reload smart-home.ts

deno run deploy.ts
deno run deploy.ts > k8s.yaml
rm k8s.yaml
docker run -i hayd/deno run - < ./deploy.ts > k8s.yaml
