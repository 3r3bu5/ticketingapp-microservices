import { Request, Response } from 'express';

const currentuser = async (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
};

export { currentuser as currentuserCtrl };
