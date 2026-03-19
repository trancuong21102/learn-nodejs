import { hashPassword } from "services/user-service";
import { prisma } from "./client";
import { ACCOUT_TYPE } from "./constant";
import { name } from "ejs";

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();
    if (countRole === 0) {
        await prisma.role.createMany({
            data: [
                {
                    name: "ADMIN",
                    description: "Amin role"
                },
                {
                    name: "USER",
                    description: "user role"
                }
            ]
        })
    }
      if (countUser === 0) {
            const defaultPassword = await hashPassword("123456");
            const adminRole = await prisma.role.findFirst({
                where: { name: "ADMIN" }
            })
            if(adminRole) 
        await prisma.user.createMany({

            data: [
                {
                    fullName: "CuongTran",
                    password: defaultPassword,
                    accountType: ACCOUT_TYPE.SYSTEM,
                    phone: "1234567890",
                    username: "johndoe",
                    roleId: adminRole.id
                },
                {
                    fullName: "Admin",
                    password: defaultPassword,
                    accountType: ACCOUT_TYPE.SYSTEM,
                    phone: "1234567890",
                    username: "admin2",
                    roleId: adminRole.id
                },
            ]
        })
    } if(countRole !== 0 && countUser !== 0) {
        console.log("Database already seeded");
    }

}

export default initDatabase;