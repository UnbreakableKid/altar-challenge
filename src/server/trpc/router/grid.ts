import { router, publicProcedure } from "../trpc";
import { string, z } from "zod";

export const gridRouter = router({
  generate: publicProcedure.query(({ input }) => {
    let randomString = "";
    for (let i = 0; i < 100; i++) {
      //random alphabetic characters
      randomString += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }
    return randomString;
  }),
  generateWithCharacter: publicProcedure.query(({ input }) => {
    let randomString = "";
    for (let i = 0; i < 100; i++) {
      //random alphabetic characters
      randomString += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }
  }),
});
