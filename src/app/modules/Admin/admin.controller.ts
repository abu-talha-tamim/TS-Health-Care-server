import { Request, Response } from 'express';
import { pick } from '../../../Shared/pick';
import { adminService } from './admin.service';
import { adminFilterableFields } from './admin.constant';


const getAllFromDB = async (req: Request, res: Response) => {
    try {
        // console.log(req.query)
        const filters = pick(req.query, adminFilterableFields);
        const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
        console.log(options)
        const result = await adminService.getAllFromDB(filters, options)
        res.status(200).json({
            success: true,
            message: "Admin data fetched!",
            data: result
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: (err as Error)?.name || "Something went wrong",
            error: err
        })
    }
}

export const AdminController = {
    getAllFromDB
}