import { Request, Response } from "express";
import { UserService } from "./user.service";
const createAdmin = async (req: Request, res: Response) => {
    
    try {
        const result = await UserService.createAdmin(req.body);
    res.status(201).json({
        success: true,
        message: "Admin created successfully",
        data: result.data
    });

    } catch (error) {
        res.status(500).json({
            success: false,
            message : (error as Error)?.name || "Failed to create admin",
            error: error
        })
    }
}

export const userController = {
    createAdmin

}

