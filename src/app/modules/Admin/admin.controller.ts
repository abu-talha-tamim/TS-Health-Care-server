
import{ Request, Response } from 'express';
import { adminService } from './admin.service';

const getAllFromDB = async (req: Request, res: Response) => {
    console.log(req.query);
   try {
     const result = await adminService.getAllFromDB(req.query);
        res.status(200).json({
            success: true,
            message: "Admin fetched successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: (error as Error)?.name || "Something went wrong",
            error: error
        });
    }
};

export const adminController = {
    getAllFromDB
};