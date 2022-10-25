import { router, publicProcedure } from "../trpc";
import { string, z } from "zod";
import { randomWithChar } from "../../../utils/randomWithChar";

export const gridRouter = router({
  generate: publicProcedure.query(({ input }) => {
    let randomString = "";
    for (let i = 0; i < 100; i++) {
      //random alphabetic characters
      randomString += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }
    return randomString;
  }),
  generateWithCharacter: publicProcedure
    .input(z.object({ char: string().min(1).max(1).nullable() }))
    .query(({ input }) => {
      const char = input.char;
      let randomString = "";
      for (let i = 0; i < 100; i++) {
        //random alphabetic characters
        randomString += String.fromCharCode(
          Math.floor(Math.random() * 26) + 97
        );
      }
      if (char !== null) {
        //replace random 20 characters with the input character
        randomString = randomWithChar(char, randomString);
      }
      return randomString;
    }),
});
