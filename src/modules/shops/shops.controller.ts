import {
  Controller,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  Post,
  Get,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ShopsService } from './shops.service';
import { UpdateShopDto } from './dto/update-shop.dto';
import { CreateShopDto } from './dto/create-shop.dto';

@ApiTags('shops')
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) { }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get shops' })
  @ApiResponse({ status: 200, description: 'Return all shops' })
  getAll(
  ) {
    return this.shopsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get shop' })
  @ApiResponse({ status: 200, description: 'Return shop by id.' })
  get(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.shopsService.findAll(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update shop' })
  @ApiResponse({ status: 200, description: 'The shop has been successfully updated.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateShopDto: UpdateShopDto,
  ) {
    return this.shopsService.update(id, updateShopDto);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create shop' })
  @ApiResponse({ status: 200, description: 'The shop has been successfully create.' })
  create(
    @Body() createShopDto: CreateShopDto,
  ) {
    return this.shopsService.create(createShopDto);
  }
}