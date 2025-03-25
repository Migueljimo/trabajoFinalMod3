import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAuthorDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    nationality: string;

    @IsString()
    birth_date: string;
}

export class UpdateAuthorDto {
    @IsString()
    name?: string;

    @IsString()
    nationality?: string;

    @IsString()
    birth_date?: string;
}
