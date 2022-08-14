import { ObjectID } from "typeorm";

export interface JwtPayload {
  userId: ObjectID;
  email?: string;
}
