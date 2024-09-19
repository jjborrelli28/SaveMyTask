import {
  type ComparisonOperatorExpression,
  type OperandValueExpressionOrList,
  type OrderByDirectionExpression,
} from "kysely";
import { type ExtractTableAlias } from "kysely/dist/cjs/parser/table-parser";
import { type UpdateObjectExpression } from "kysely/dist/cjs/parser/update-set-parser";
import db from "../database/database";
import {
  type CreateTaskData,
  type CreateUserData,
  type SaveMyTaskDatabase,
  type TableNames,
  type TaskKeys,
  type UserKeys,
} from "../types";

// General helpers
export const getItem = async (
  tableName: TableNames,
  search: { key: UserKeys | TaskKeys; value: string | number }
) => {
  return await db
    .selectFrom(tableName)
    .selectAll()
    .where(search.key, "=", search.value)
    .executeTakeFirst();
};

export const getAllTableItems = async (tableName: TableNames) => {
  return await db.selectFrom(tableName).selectAll().execute();
};

export const insertItem = async (
  tableName: TableNames,
  item: CreateUserData | CreateTaskData
) => {
  return await db.insertInto(tableName).values(item).executeTakeFirstOrThrow();
};

export const updateItem = async <T extends TableNames>(
  tableName: T,
  id: OperandValueExpressionOrList<
    SaveMyTaskDatabase,
    ExtractTableAlias<SaveMyTaskDatabase, T>,
    "id"
  >,
  updateItemData: UpdateObjectExpression<
    SaveMyTaskDatabase,
    ExtractTableAlias<SaveMyTaskDatabase, T>,
    ExtractTableAlias<SaveMyTaskDatabase, T>
  >
) => {
  return await db
    .updateTable(tableName)
    .set(updateItemData)
    .where("id", "=", id)
    .execute();
};

export const deleteItem = (taskName: TableNames, id: number) => {
  return db.deleteFrom(taskName).where("id", "=", id).execute();
};

// Task Helpers
export const getItemsByUser = async (
  tableName: TableNames,
  userId: number,
  search: {
    key?: UserKeys | TaskKeys;
    comparator?: ComparisonOperatorExpression;
    value: string;
  },
  limit: number,
  offset: number,
  order?: {
    key?: UserKeys | TaskKeys;
    type?: OrderByDirectionExpression;
  }
) => {
  return await db
    .selectFrom(tableName)
    .selectAll()
    .where("user_id", "=", userId)
    .where(
      search.key || "title",
      search.comparator || "like",
      `%${search.value}%`
    )
    .limit(limit)
    .offset(offset)
    .orderBy(order?.key || "id", order?.type || "desc")
    .execute();
};

export const getTotalFilteredItemsByUser = async (
  tableName: TableNames,
  userId: number,
  search: {
    key?: UserKeys | TaskKeys;
    comparator?: ComparisonOperatorExpression;
    value: string;
  },
  order?: {
    key?: UserKeys | TaskKeys;
    type?: OrderByDirectionExpression;
  }
) => {
  return await db
    .selectFrom(tableName)
    .selectAll()
    .where("user_id", "=", userId)
    .where(
      search.key || "title",
      search.comparator || "like",
      `%${search.value}%`
    )
    .orderBy(order?.key || "id", order?.type || "desc")
    .execute();
};

export const getNumberOfTotalItemsByUser = async (
  tableName: TableNames,
  userId: number
) => {
  return await db
    .selectFrom(tableName)
    .where("user_id", "=", userId)
    .select([db.fn.count("id").as("totalCount")])
    .execute();
};
