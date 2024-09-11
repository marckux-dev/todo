import {UsecaseInterface} from "../../application/usecases";
import {Response} from "express";
import {QueryError} from "../../domain/errors/query.error";

interface HandleUseCaseOptions {
  usecase: UsecaseInterface;
  res: Response;
  params?: object;
  successStatus?: number;
  errorStatus?: number;
}

export const handleUseCase = async ({
  usecase,
  res,
  params,
  successStatus = 200,
  errorStatus = 400
}: HandleUseCaseOptions): Promise<Response> => {
  try {
    const result = await usecase.execute(params);
    return res.status(successStatus || 200).json(result);
  } catch (e) {
    if (e instanceof QueryError) {
      return res.status(errorStatus || 400).json({message: e.message});
    } else {
      return res.status(500).json({message: "Internal Server Error"});
    }
  }
}