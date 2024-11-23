import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { TypePlans } from './entities/type-plans.entity';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(TypePlans)
    private readonly typePlansRepository: Repository<TypePlans>,
  ) { }

  async findAll(dealerId?: number) {
    const queryBuilder = this.companyRepository
      .createQueryBuilder('company')
      .leftJoinAndSelect('company.typeDocumentIdentification', 'typeDocumentIdentification')
      .leftJoinAndSelect('company.typeOrganization', 'typeOrganization')
      .leftJoinAndSelect('company.typeRegime', 'typeRegime')
      .leftJoinAndSelect('company.typeLiability', 'typeLiability')
      .leftJoinAndSelect('company.municipality', 'municipality')
      .leftJoinAndSelect('company.typePlans', 'typePlans')
      .leftJoinAndSelect('company.user', 'user')
      .leftJoinAndSelect('company.shops', 'shop')
      .where('type_plan_id <> 0');

    if (dealerId) {
      queryBuilder.andWhere('dealer_id = :dealerId ', { dealerId });
    }

    return queryBuilder.getMany();
  }

  async findOne(id?: number) {
    const queryBuilder = this.companyRepository
      .createQueryBuilder('company')
      .leftJoinAndSelect('company.typeDocumentIdentification', 'typeDocumentIdentification')
      .leftJoinAndSelect('company.typeOrganization', 'typeOrganization')
      .leftJoinAndSelect('company.typeRegime', 'typeRegime')
      .leftJoinAndSelect('company.typeLiability', 'typeLiability')
      .leftJoinAndSelect('company.municipality', 'municipality');

    if (id) {
      queryBuilder.where('company.id = :id', { id });
    }
    const company = await queryBuilder.getOne();

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    return company;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.findOne(id);

    const updatedCompany = {
      ...updateCompanyDto,
      typeDocumentIdentification: updateCompanyDto.typeDocumentIdentificationId ?
        { id: updateCompanyDto.typeDocumentIdentificationId } : undefined,
      typeOrganization: updateCompanyDto.typeOrganizationId ?
        { id: updateCompanyDto.typeOrganizationId } : undefined,
      typeRegime: updateCompanyDto.typeRegimeId ?
        { id: updateCompanyDto.typeRegimeId } : undefined,
      typeLiability: updateCompanyDto.typeLiabilityId ?
        { id: updateCompanyDto.typeLiabilityId } : undefined,
      municipality: updateCompanyDto.municipalityId ?
        { id: updateCompanyDto.municipalityId } : undefined
    };

    await this.companyRepository.save({
      ...company,
      ...updatedCompany,
    });
    return this.findOne(id);
  }

  async addFolios(companyId: number, newFolios: number) {
    const company = await this.findOne(companyId);

    const typePlans = await this.findOneTypePlan(company.typePlanId);
    await this.typePlansRepository.save({
      ...typePlans,
      qtyDocsInvoice: typePlans.qtyDocsInvoice + newFolios,
      state: true
    });

    return this.findOne(companyId);
  }

  private async findOneTypePlan(id: number) {

    const queryBuilder = this.typePlansRepository
      .createQueryBuilder('type-plans')
      .where('type-plans.id = :id', { id });

    const typePlans = await queryBuilder.getOne();

    if (!typePlans) {
      throw new NotFoundException(`typePlans with ID ${id} not found`);
    }

    return typePlans;
  }
}
