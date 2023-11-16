import { PartialType } from '@nestjs/mapped-types';
import { CreateHomeDto } from './create-home.dto';
import { IsString, IsInt } from 'class-validator';

export class UpdateHomeDto extends PartialType(CreateHomeDto) {}
