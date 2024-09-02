import {
  ComparisonOperatorExpression,
  OperandValueExpressionOrList,
  OrderByDirectionExpression,
} from "kysely";
import { ExtractTableAlias } from "kysely/dist/cjs/parser/table-parser";
import { UpdateObjectExpression } from "kysely/dist/cjs/parser/update-set-parser";
import db from "../database/database";
import {
  CreateTaskData,
  CreateUserData,
  SaveMyTaskDatabase,
  TableNames,
  TaskKeys,
  UserKeys,
} from "../types";

export const getItem = async (
  tableName: TableNames,
  objectKey: UserKeys | TaskKeys,
  objectValue: string | number
) =>
  await db
    .selectFrom(tableName)
    .selectAll()
    .where(objectKey, "=", objectValue)
    .executeTakeFirst();

export const getItems = async (
  tableName: TableNames,
  userId: number,
  search: {
    key: UserKeys | TaskKeys;
    comparator?: ComparisonOperatorExpression;
    value: string;
  },
  limit: number,
  offset: number,
  order: {
    key: UserKeys | TaskKeys;
    type?: OrderByDirectionExpression;
  }
) =>
  await db
    .selectFrom(tableName)
    .selectAll()
    .where("user_id", "=", userId)
    .where(search.key, search.comparator || "like", `%${search.value}%`)
    .limit(limit)
    .offset(offset)
    .orderBy(order.key, order.type || "desc")
    .execute();

export const getAllItems = async (
  tableName: TableNames,
  userId: number,
  order: {
    key: UserKeys | TaskKeys;
    type?: OrderByDirectionExpression;
  }
) =>
  await db
    .selectFrom(tableName)
    .selectAll()
    .where("user_id", "=", userId)
    .orderBy(order.key, order.type || "desc")
    .execute();

export const getNumberOfTotalItems = async (
  tableName: TableNames,
  userId: number,
  key: UserKeys | TaskKeys
) =>
  await db
    .selectFrom(tableName)
    .where("user_id", "=", userId)
    .select([db.fn.count(key).as("totalCount")])
    .execute();

export const insertItem = async (
  tableName: TableNames,
  item: CreateUserData | CreateTaskData
) => await db.insertInto(tableName).values(item).executeTakeFirstOrThrow();

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
) =>
  await db
    .updateTable(tableName)
    .set(updateItemData)
    .where("id", "=", id)
    .execute();

export const deleteItem = (taskName: TableNames, id: number) =>
  db.deleteFrom(taskName).where("id", "=", id).execute();

export const getUserItem = async (
  tableName: TableNames,
  userId: number,
  objectKey: UserKeys | TaskKeys,
  objectValue: string | number
) =>
  await db
    .selectFrom(tableName)
    .selectAll()
    .where("user_id", "=", userId)
    .where(objectKey, "=", objectValue)
    .executeTakeFirst();
