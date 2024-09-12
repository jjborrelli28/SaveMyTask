import { getItem } from "./database";

const verifyUser = async (userId?: number) => {
  if (!userId) return null;

  const user = await getItem("user", { key: "id", value: userId });

  return !!user;
};

export default verifyUser;
