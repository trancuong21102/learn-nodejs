import { prisma } from "./client";

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    if (countUser === 0) {
        await prisma.user.createMany({
            data: [
                {
                    fullName: "John Doe",
                    password: "johndoe",
                    accountType: "admin",
                    phone: "1234567890",
                    username: "johndoe"
                },
                {
                    fullName: "John Doe",
                    password: "johndoe",
                    accountType: "admin",
                    phone: "1234567890",
                    username: "admin2"
                },
            ]
        })
    } else {
        console.log("Database already seeded");
    }

}

export default initDatabase;