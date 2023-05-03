import { IsNotEmpty, IsString } from "class-validator";

export class CreateBrokerageDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
