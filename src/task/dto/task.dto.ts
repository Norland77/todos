import { IsNotEmpty, IsString } from 'class-validator';
export class TaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;

  @IsString()
  priority: string;
}
