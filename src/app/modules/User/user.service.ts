import { UserRole, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../Shared/prisma";

const createAdmin = async (data: any) => {
  const hashedPassword: string = await bcrypt.hash(data.password, 12);

  const userData = {
    email: data.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(
    async (transactionClient: Prisma.TransactionClient) => {
      await transactionClient.user.create({
        data: userData,
      });

      const createdAdminData = await transactionClient.admin.create({
        data: data.admin,
      });

      return createdAdminData;
    }
  );

  return result;
};

export const UserService = {
  createAdmin,
};
