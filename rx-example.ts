import { range } from "https://deno.land/x/rxjs/mod.ts";
import { map, filter } from "https://deno.land/x/rxjs/operators.ts";

range(1, 200)
  .pipe(
    filter((x) => {
      return x % 2 === 1;
    }),
    map((x) => x + x),
  )
  .subscribe((x) => console.log(x));
