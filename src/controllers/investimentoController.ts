import { Request, Response, Router } from "express";
import { CREATED, OK } from "http-status-codes";
import middlewares from "../middlewares/middlewaresIndex";
import investimentoService from "../services/investimentoService";

const investimentoController = Router();

investimentoController.get(
  "/",
  async (_req: Request, res: Response): Promise<Response> => {
    const assets = await investimentoService.getAssets();
    return res.status(OK).json(assets);
  }
);

investimentoController.get(
  "/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const asset = await investimentoService.getAssetById(req);
    return res.status(OK).json(asset);
  }
);

investimentoController.post(
  "/comprar",
  middlewares.validateAssetRequest,
  middlewares.validateAssetStock,
  async (req: Request, res: Response): Promise<Response> => {
    await investimentoService.buyAssets(req);
    return res.status(CREATED).json({ message: "Ações compradas" });
  }
);

investimentoController.post(
  "/vender",
  middlewares.validateAssetRequest,
  middlewares.validateAssetBalance,
  async (req: Request, res: Response): Promise<Response> => {
    await investimentoService.sellAssets(req);
    return res.status(CREATED).json({ message: "Ações vendidas" });
  }
);

export default investimentoController;
