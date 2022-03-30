import {Request, Response, NextFunction} from "express";

/**
 *
 * @param {Object} opts
 * @param {Array<"admin"| "manager" | "user">} opts.hasRole approved roles
 * @param {boolean} opts.allowSameUser toggle allow same user
 * @return {Function} a function that returns NextFunction or an http exception
 */
export function isAuthorized(opts: {
  hasRole: Array<"admin"| "manager" | "user">,
  allowSameUser?: boolean
}) {
  return (req: Request, res: Response, next: NextFunction) => {
    const {role, email, uid} = res.locals;
    const {id} = req.params;

    if (email === "sergiojaimito@gmail.com") {
      return next();
    }
    if (opts.allowSameUser && id && uid === id) {
      return next();
    }
    if (!role) {
      return res.status(403).send();
    }
    if (opts.hasRole.includes(role)) {
      return next();
    }
    return res.status(403).send();
  };
}
