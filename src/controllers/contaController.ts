import { Request, Response, Router } from "express";
import { CREATED, OK } from "http-status-codes";
import contaService from "../services/contaService";

const contaController = Router();

contaController.get(
  "/:id",
  /* authClient, */
  async (req: Request, res: Response): Promise<Response> => {
    const balance = await contaService.getBalance(req);
    return res.status(OK).json(balance);
  }
);

export default contaController;
