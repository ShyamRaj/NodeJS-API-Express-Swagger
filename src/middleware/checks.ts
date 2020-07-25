import { Request, Response, NextFunction } from "express";
import { HTTP400Error } from "../utils/HttpErrors";

export const checkIdParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.query.id) {
        throw new HTTP400Error("Missing id parameter");
    } else {
        next();
    }
};

export const checkRequestBody = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.body) {
        throw new HTTP400Error("Missing body");
    } else {
        next();
    }
};
