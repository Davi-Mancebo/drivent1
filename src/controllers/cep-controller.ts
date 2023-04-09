import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { isValidCEP } from '@brazilian-utils/brazilian-utils';
import axios from 'axios';
import { request } from '@/utils/request';

export default async function cepFinder(req: Request, res: Response) {
  const { cep } = req.params;
  try {
    const { data } = await request.get(`${process.env.VIA_CEP_API}/${cep}/json/`);
    if (data === null)
      return res.status(httpStatus.BAD_REQUEST).send({
        erro: 'true',
      });

    const returnableObject = {
      logradouro: data.cep,
      complemento: data.complemento,
      bairro: data.bairro,
      cidade: data.cidade,
      uf: data.uf,
    };
    return res.status(httpStatus.OK).send(returnableObject);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}
