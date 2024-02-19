import { IsNotEmpty, IsString } from 'class-validator';
export class TaskEditDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  description?: string;

  @IsString()
  priority?: string;

  @IsString()
  status?: string;
}
