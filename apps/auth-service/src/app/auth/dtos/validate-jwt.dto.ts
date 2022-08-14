import { IsJWT, IsNotEmpty, IsString } from "class-validator";

export class ValidateJwtDto {
  @IsString()
  @IsNotEmpty()
  @IsJWT()
  jwt: string;
}
