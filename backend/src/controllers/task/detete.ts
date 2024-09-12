import { type Response } from "express";
import { deleteItem, getItem } from "../../helpers/database";
import { type RequestProps } from "../../middleware/authentication";
import { idParamSchema } from "../../validations";

const deleteTask = async (req: RequestProps, res: Response) => {
  const idValidation = idParamSchema.safeParse(req.params);

  if (!idValidation.success) {
    return res.status(400).json({
      message: idValidation.error.issues
        .map((issue) => issue.message)
        .join(", "),
    });
  }

  const { id } = idValidation.data;

  try {
    const result = await deleteItem("task", id);

    if (result[0].numDeletedRows === BigInt(0)) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json({ message: "Task successfully deleted!" });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete task",
    });
  }
};

export default deleteTask;
