import { PrismaClient, UserRole, } from "@prisma/client";
import bcrypt from 'bcrypt';



const prisma = new PrismaClient();
const createAdmin = async (data: any) => {
    const hashPassword: string = await bcrypt.hash(data.password, 10);
    const userData = {
        email: data.admin.email,
        password: hashPassword,
        role: UserRole.ADMIN,
    }

    const result = await prisma.$transaction(async (transactionClient) => {
        const createdUserData = await transactionClient.user.create({
            data: userData
        });

        const { contactNumber, ...adminRawData } = data.admin;
        const adminData = {
            ...adminRawData,
            contractNumber: contactNumber,
        };

        const createdAdminData = await transactionClient.admin.create({
            data: adminData
        });
        return { createdAdminData };
    });


    return {
        data: result
    }
}

export const UserService = {
    createAdmin
}