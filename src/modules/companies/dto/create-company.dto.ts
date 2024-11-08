import { IsString, IsNumber, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  type_document_identification_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  type_organization_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  type_regime_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  type_liability_id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  business_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  merchant_registration: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  municipality_id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;
}
