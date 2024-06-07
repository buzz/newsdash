import type { NextFunction, Request, Response } from 'express'

/**
 *  Workaround for Express typing issues
 *  https://github.com/standard/eslint-config-standard-with-typescript/issues/613#issuecomment-1082960337
 */
function asyncWrapper(asyncFn: (req: Request, res: Response) => Promise<void>) {
  return function (req: Request, res: Response, next: NextFunction) {
    asyncFn(req, res).catch(next)
  }
}

export default asyncWrapper
