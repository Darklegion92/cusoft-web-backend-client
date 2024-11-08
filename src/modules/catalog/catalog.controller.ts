import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CatalogService } from './catalog.service';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

@ApiTags('catalog')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('type-document-identifications')
  @ApiOperation({ summary: 'Get all type document identifications' })
  @ApiResponse({ status: 200, description: 'Return all type document identifications.' })
  findAllTypeDocumentIdentifications() {
    return this.catalogService.findAllTypeDocumentIdentifications();
  }

  @Get('type-organizations')
  @ApiOperation({ summary: 'Get all type organizations' })
  @ApiResponse({ status: 200, description: 'Return all type organizations.' })
  findAllTypeOrganizations() {
    return this.catalogService.findAllTypeOrganizations();
  }

  @Get('type-regimes')
  @ApiOperation({ summary: 'Get all type regimes' })
  @ApiResponse({ status: 200, description: 'Return all type regimes.' })
  findAllTypeRegimes() {
    return this.catalogService.findAllTypeRegimes();
  }

  @Get('type-liabilities')
  @ApiOperation({ summary: 'Get all type liabilities' })
  @ApiResponse({ status: 200, description: 'Return all type liabilities.' })
  findAllTypeLiabilities() {
    return this.catalogService.findAllTypeLiabilities();
  }

  @Get('municipalities')
  @ApiOperation({ summary: 'Get all municipalities' })
  @ApiResponse({ status: 200, description: 'Return all municipalities.' })
  findAllMunicipalities() {
    return this.catalogService.findAllMunicipalities();
  }
}