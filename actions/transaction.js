"use server";

import aj from "@/lib/arcjet";
import { db } from "@/lib/prisma";
import { request } from "@arcjet/next";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializeAmount = (obj) => ({
  ...obj,
  amount: obj.amount.toNumber(),
});

export async function createTransaction(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // Arcjet to add rate limiting
    const req = await request();

    // check rete limiting
    const decision = await aj.protect(req, {
      userId,
      requested: 1,
    });

    if (decision.isDenied()) {
      console.log("DECISION ", decision.reason);
      console.log("DECISION ", decision.reason.isRateLimit());

      if (decision.reason.isRateLimit()) {
        const { remaining, reset } = decision.reason;
        console.log({
          code: "RATE_LIMIT_EXCEEDED",
          details: {
            remaining,
            resetInSeconds: reset,
          },
        });

        throw new Error("Too many requests. Please try again later. ");
      }
      throw new Error("Request Blocked ");
    }

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    console.log("TRANSACTION DATA ", data);

    const account = await db.account.findUnique({
      where: {
        id: data.accountId,
        userId: user.id,
      },
    });

    if (!account) {
      throw new Error("Account not found");
    }

    const balanceChange = data.type === "EXPENSE" ? -data.amount : data.amount;

    const newBalance = account.balance.toNumber() + balanceChange;

    const transaction = await db.$transaction(async (tx) => {
      const newTransaction = await tx.transaction.create({
        data: {
          ...data,
          userId: user.id,
          nextRecurringDate:
            data.isRecurring && data.recurringInterval
              ? calculateNextRecurringDate(data.date, data.recurringInterval)
              : null,
        },
      });

      await tx.account.update({
        where: { id: data.accountId },
        data: { balance: newBalance },
      });

      return newTransaction;
    });

    revalidatePath("/dashboard");
    revalidatePath(`/account/${transaction.accountId}`);

    console.log("TRANSACTION ", transaction);

    return { success: true, data: serializeAmount(transaction) };
  } catch (error) {
    console.log("ERROR ", error);

    throw new Error(error);
    // return { success: false, error };
  }
}

// Helper function to calculate next recurring date
const calculateNextRecurringDate = (startDate, interval) => {
  try {
    const date = new Date(startDate);

    switch (interval) {
      case "DAILY":
        date.setDate(date.getDate() + 1);
        break;
      case "WEEKLY":
        date.setDate(date.getDate() + 7);
        break;
      case "MONTHLY":
        date.setMonth(date.getMonth() + 1);
        break;
      case "YEARLY":
        date.setFullYear(date.getFullYear() + 1);
        break;
    }
    return date;
  } catch (error) {
    throw new Error("Error in calculating next recurring date");
  }
};
