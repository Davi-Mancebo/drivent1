import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { request } from '@/utils/request';

export default async function cepFinder(req: Request, res: Response) {
  const { cep } = req.params;
  try {
    const { data } = await request.get(`${process.env.VIA_CEP_API}/${cep}/json/`);
    if (data === null) return res.status(httpStatus.NO_CONTENT).send(httpStatus['204_MESSAGE']);

    return res.status(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(httpStatus['500_MESSAGE']);
  }
}
