// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { userRouter } from "./user";
import { authRouter } from "./auth";
import { gridRouter } from "./grid";
import { codeRouter } from "./code";

export const appRouter = router({
  user: userRouter,
  auth: authRouter,
  grid: gridRouter,
  code: codeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
