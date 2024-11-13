import {
  Controller,
  Get,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CompaniesService } from './companies.service';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) { }

  @Get(':dealerId')
  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({ status: 200, description: 'Return all companies.' })
  findAll(@Param('dealerId', ParseIntPipe) dealerId: number) {
    return this.companiesService.findAll(dealerId);
  }

  @Patch(':id/:folios')
  @ApiOperation({ summary: 'Add Folios Company' })
  @ApiResponse({ status: 200, description: 'Folios has been successfully add.' })
  addFolios(
    @Param('id', ParseIntPipe) id: number,
    @Param('folios', ParseIntPipe) folios: number,
  ) {
    return this.companiesService.addFolios(id, folios);
  }
}