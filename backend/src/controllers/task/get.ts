import { type Response } from "express";
import { z } from "zod";
import {
  getItemsByUser,
  getNumberOfTotalItemsByUser,
  getTotalFilteredItemsByUser,
} from "../../helpers/database";
import { type RequestProps } from "../../middleware/authentication";

const queryParamsSchema = z.object({
  search: z.string().optional(),
  page: z.string().regex(/^\d+$/, "Page must be a positive integer").optional(),
  limit: z
    .string()
    .regex(/^\d+$/, "Limit must be a positive integer")
    .optional(),
});

const getTasks = async (req: RequestProps, res: Response) => {
  const queryParamsValidation = queryParamsSchema.safeParse(req.query);

  if (!queryParamsValidation.success) {
    return res.status(400).json({
      message: queryParamsValidation.error.issues
        .map((issue) => issue.message)
        .join(", "),
    });
  }

  const userId = req.userId!;
  const search = req.query.search!;
  const limit = Number(req.query.limit);
  const page = Number(req.query.page);
  const offset = (page - 1) * limit;

  try {
    const items = await getItemsByUser(
      "task",
      userId,
      { value: search },
      limit,
      offset
    );

    const totalFilteredItems = await getTotalFilteredItemsByUser(
      "task",
      userId,
      {
        value: search,
      }
    );

    const totalPagesOfFilteredItems = Math.ceil(
      totalFilteredItems.length / limit
    );
    const hasNextPage = page < totalPagesOfFilteredItems;

    const totalItems = await getTotalFilteredItemsByUser("task", userId, {
      value: "",
    });

    const data = {
      items,
      page,
      limit,
      hasNextPage,
      totalItems,
    };

    return res.json({
      ...data,
      message: "Tasks successfully obtained!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to obtain Tasks",
    });
  }
};

export default getTasks;
