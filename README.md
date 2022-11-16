# Grid Generator

## Purpose & Structure

The application generates 10x10 grids and their correspondent code (see below).
This webApp is separated into 2 sections.

The first section is the grid generator, where the user can generate 10x10 grids. The grid is automatically refreshed every **2s**. The user can choose to pause the generation if they want. There's an input box that allows a user to place a single character. This character will enter the grid generation algorithm making it so atleast 20% of the grid will be that character, i.e 20/100. After inputing this character, the user is locked out of changing it again for 4s.

The second section is payments. Here, users can add to their account the current generated grid with a given name and amount that they choose. There are a few caveats to this page:

- Users must be logged in to see their payments, otherwise they are redirected to the login page.
  - Currently, the **authentication is only with GitHub**.
- If not paused, grids will continue to generate in the background.

## Code

The code is generated when the grid is generated. To compute the code, it follows this algorithm:

1. Get the 2 digit seconds from the system clock, like so: 12:40:**36**
2. Get the matching grid cell characters for the positions [3,6] and [6,3], like so: “v” and
   “c”.
3. Count the occurrences of “v” and “c” on the entire grid, like so: v = 7, c = 9.
4. **Exception**: If the count is larger than 9, divide the count by the lowest integer possible
   in order to get a value lower or equal to 9.
5. Done! That is your code: 79

## Stack

The application uses the following stack

- TRPC for the backend API
- NextJS for the frontend and server
- NextAuth to simplify authentication flow
- Prisma for the ORM
- Chakra-UI for the UI Framework
- React-Query wrapped by TRPC to manage server state
- Jotai for global client state management

To run the application, you **need** to create a .env file that follows the .env-example structure.

## Dev environment

If the environment is set to Development, the users will get extra feedback.

- React-Query devtools, so they can see the server state calls
- Extra information, in the grid generation page, in the code box. This information includes:
  - The first character
  - The second character
  - The system time seconds when the grid was generated
  - The first coordinate
  - The second coordinate

## Deployment

The project has been deployed to Vercel here https://altar-unbreakablekid.vercel.app/ for easy viewing without needing to setup. The deployement is automatically done on commit in the feat/joao-pacheco branch. This deployment uses a Supabase instance thaat is running the PostgreSQL database. I have also enabled the development version of the code box in the grid generation page just for viewing.

### **Important**

I'm using the free tier of both Vercel and Supabase to host this challenge, so a couple of points are important:

- Supabase hybernates their instances when they aren't being used in a certain time-frame. If this happens please let me know.
- Vercel's free tier isn't exactly the best server one can get, so some longer times might happen on cold-start.
