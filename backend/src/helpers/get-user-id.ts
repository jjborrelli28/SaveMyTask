import { getItem } from "./database";

const getUserId = async (userId: number | undefined) => {
  if (!userId) return null;

  const user = await getItem("user", "id", userId);

  return user?.id;
};

export default getUserId;
