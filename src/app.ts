import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRouter } from './app/modules/User/user.routes';
import { adminRoutes } from './app/modules/Admin/admin.routes';


const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.send({
        message: "ST health care server is running"
    })
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/admins', adminRoutes);
export default app;
