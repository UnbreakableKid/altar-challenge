import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const paymentRouter = router({
  createPayment: publicProcedure
    .input(
      z.object({
        payment: z.string(),
        amount: z.number(),
        grid: z.string().min(100),
        code: z.string().min(2).max(2),
      })
    )
    .mutation(({ ctx, input }) => {
      //create payment and connect to user in session
      return ctx.prisma.payments.create({
        data: {
          name: input.payment,
          amount: input.amount,
          grid: input.grid,
          code: input.code,
          user: {
            connect: {
              id: ctx.session!.user?.id,
            },
          },
        },
      });
    }),
  getPayments: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      //get payments for user
      return ctx.prisma.payments.findMany({
        where: {
          userId: input.userId,
        },
      });
    }),
  deletePayment: protectedProcedure
    .input(
      z.object({
        paymentId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      //delete payment
      return ctx.prisma.payments.delete({
        where: {
          id: input.paymentId,
        },
      });
    }),
});
