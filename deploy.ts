import { createMicroservice } from "https://deno.land/x/gh:yshayy:deploykit@0.0.17/blueprint/k8s/app.ts";
import {
  addDeployment,
  addService,
  expose,
} from "https://deno.land/x/gh:yshayy:deploykit@0.0.17/blueprint/k8s/operators/all.ts";
import { modify } from "https://deno.land/x/gh:yshayy:deploykit@0.0.17/blueprint/mod.ts";

createMicroservice().with(
  addDeployment({ image: "my-image" }),
  addService({ port: 80 }),
  expose({ domain: "my-app.com" }),
  modify((x) => {
    x.deployment.spec.replicas = 3;
  }),
).dump(
  { name: "my-app", namespace: "my-namespace", labels: { app: "my-app" } },
);
