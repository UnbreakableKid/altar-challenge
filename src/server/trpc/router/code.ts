import { router, publicProcedure } from "../trpc";
import { string, z } from "zod";
import { randomWithChar } from "../../../utils/randomWithChar";

export const codeRouter = router({
  generate: publicProcedure
    .input(
      z.object({
        character: string().max(1).nullish(),
        grid: string().min(100).nullish(),
      })
    )
    .query(({ input }) => {
      let grid = input.grid;
      let char = input.character?.toLowerCase();

      if (!grid) {
        return { value: "" };
      }

      if (char) {
        //replace random 20 characters with the input character
        grid = randomWithChar(char, grid);
      }
      // To compute the code, the following trivial algorithm needs to be followed:
      // 1. Get the 2 digit seconds from the system clock, like so: 12:40:36
      // 2. Get the matching grid cell characters for the positions [3,6] and [6,3], like so: “v” and “c”.
      // 3. Count the occurrences of “v” and “c” on the entire grid, like so: v = 7, c = 9.
      // 4. Exception: If the count is larger than 9, divide the count by the lowest integer possible in order to get a value lower or equal to 9.
      // 5. Done! That is your code: 79
      // get 2 digit seconds from system clock
      const date = new Date();
      const seconds = date.getSeconds();
      const lastVal = seconds % 10;
      const firstVal = (seconds - lastVal) / 10;
      const firstLocation = 10 * lastVal + firstVal;
      const secondLocation = 10 * firstVal + lastVal;
      const firstChar = grid[firstLocation];
      const secondChar = grid[secondLocation];
      //count the occurrences of firstChar and secondChar on the entire grid
      let firstCharCount = 0;
      let secondCharCount = 0;
      for (let i = 0; i < grid.length; i++) {
        if (grid[i] === firstChar) {
          firstCharCount++;
        }
        if (grid[i] === secondChar) {
          secondCharCount++;
        }
      }
      //exception: if the count is larger than 9, divide the count by the lowest integer possible in order to get a value lower or equal to 9
      if (firstCharCount > 9) {
        firstCharCount = Math.floor(firstCharCount / 10);
      }
      if (secondCharCount > 9) {
        secondCharCount = Math.floor(secondCharCount / 10);
      }
      return {
        value: firstCharCount.toString() + secondCharCount.toString(),
        firstChar,
        secondChar,
        seconds,
        firstVal,
        lastVal,
        grid,
      };
    }),
});
