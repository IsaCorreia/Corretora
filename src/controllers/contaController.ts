import { Request, Response, Router } from "express";
import { CREATED, OK } from "http-status-codes";
import middlewaresIndex from "../middlewares/middlewaresIndex";
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

contaController.post(
  "/deposito",
  /* authClient, */
  middlewaresIndex.validateAccountOperation,
  async (req: Request, res: Response): Promise<Response> => {
    await contaService.deposit(req);
    return res.status(CREATED).json({ message: "Depósito efetuado" });
  }
);

contaController.post(
  "/saque",
  /* authClient, */
  middlewaresIndex.validateAccountBalance,
  middlewaresIndex.validateAccountOperation,
  async (req: Request, res: Response): Promise<Response> => {
    await contaService.withdraw(req);
    return res.status(CREATED).json({ message: "Saque efetuado" });
  }
);

export default contaController;
