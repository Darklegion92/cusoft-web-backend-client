import {
  Controller,
  Get,
  Patch,
  Param,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { Role } from '../../core/constants/roles.enum';

@ApiTags('companies')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) { }

  @Get()
  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({ status: 200, description: 'Return all companies.' })
  findAll(@Request() req: { user: { id: number, role: Role } }) {
    // Si es admin, puede ver todas las companies, si es dealer solo las suyas
    const dealerId = req.user.role === Role.ADMIN ? undefined : req.user.id;
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