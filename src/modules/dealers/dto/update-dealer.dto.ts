import { PartialType } from '@nestjs/swagger';
import { CreateDealerDto } from './create-dealer.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsPhoneNumber } from 'class-validator';

export class UpdateDealerDto extends PartialType(CreateDealerDto) {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
}