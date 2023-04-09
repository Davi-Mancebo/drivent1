import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { request } from '@/utils/request';

export default async function cepFinder(req: Request, res: Response) {
  const { cep } = req.params;
  try {
    const { data } = await request.get(`${process.env.VIA_CEP_API}/${cep}/json/`);
    if (data === null) return res.sendStatus(httpStatus.NO_CONTENT);
    const returnableObject = {
      logradouro: data.cep,
      complemento: data.complemento,
      bairro: data.bairro,
      cidade: data.cidade,
      uf: data.uf,
    };
    return res.status(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}
