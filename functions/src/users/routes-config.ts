import {Application} from "express";
import {create, all, get, patch, remove} from "./controller";
import {isAuthenticated} from "../auth/authenticated";
import {isAuthorized} from "../auth/authorized";

/**
 *
 * @param {Application} app express application
 */
export function routesConfig(app: Application) {
  app.post(
      "/users",
      isAuthenticated,
      isAuthorized,
      create
  );
  app.get("/users", [
    isAuthenticated,
    isAuthorized({hasRole: ["admin", "manager"], allowSameUser: true}),
    all,
  ]);
  app.get("/users/:id", [
    isAuthenticated,
    isAuthorized({hasRole: ["admin", "manager"], allowSameUser: true}),
    get,
  ]);
  app.patch("/users/:id", [
    isAuthenticated,
    isAuthorized({hasRole: ["admin", "manager"], allowSameUser: true}),
    patch,
  ]);
  app.delete("/users/:id", [
    isAuthenticated,
    isAuthorized({hasRole: ["admin", "manager"]}),
    remove,
  ]);
}
