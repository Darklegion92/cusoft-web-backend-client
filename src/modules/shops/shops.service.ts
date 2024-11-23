import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Shop } from './entities/shop.entity';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
  ) { }

  async create({ name, companyId, cusoftSerial }: CreateShopDto) {

    const shop = await this.shopRepository.findOne({
      where: {
        name,
        company: {
          id: companyId
        }
      }
    });

    if (shop) {
      return new BadRequestException(`Tienda con nombre ${name} ya existe para esta compañia`)
    }



    const newShop = this.shopRepository.create({
      name,
      cusoftSerial,
      company: {
        id: companyId
      }
    });

    return this.shopRepository.save(newShop);
  }

  async update(id: number, updateShopDto: UpdateShopDto) {
    const shops = await this.findAll(id)

    if (shops.length > 0) {
      const updatedCompany = {
        ...updateShopDto,
        company: updateShopDto.companyId ?
          { id: updateShopDto.companyId } : undefined,
      };
      await this.shopRepository.save({
        ...shops[0],
        ...updatedCompany,
      });
      const newShops = await this.findAll(id);
      return newShops[0];


    } else {
      return this.create({
        companyId: updateShopDto?.companyId ?? 0,
        name: updateShopDto?.name ?? '',
        cusoftSerial: updateShopDto?.cusoftSerial ?? '',
      })
    }

  }

  async findAll(id?: number) {

    const queryBuilder = this.shopRepository
      .createQueryBuilder('shop')
      .leftJoinAndSelect('shop.company', 'company');

    if (id || id === 0) {
      queryBuilder.where('shop.id = :id', { id });
    }
    return queryBuilder.getMany();
  }
}
