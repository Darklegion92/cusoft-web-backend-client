import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeDocumentIdentification } from './entities/type-document-identification.entity';
import { TypeOrganization } from './entities/type-organization.entity';
import { TypeRegime } from './entities/type-regime.entity';
import { TypeLiability } from './entities/type-liability.entity';
import { Municipality } from './entities/municipality.entity';

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(TypeDocumentIdentification)
    private readonly typeDocumentIdentificationRepository: Repository<TypeDocumentIdentification>,
    
    @InjectRepository(TypeOrganization)
    private readonly typeOrganizationRepository: Repository<TypeOrganization>,
    
    @InjectRepository(TypeRegime)
    private readonly typeRegimeRepository: Repository<TypeRegime>,
    
    @InjectRepository(TypeLiability)
    private readonly typeLiabilityRepository: Repository<TypeLiability>,
    
    @InjectRepository(Municipality)
    private readonly municipalityRepository: Repository<Municipality>,
  ) {}

  async findAllTypeDocumentIdentifications() {
    return this.typeDocumentIdentificationRepository.find();
  }

  async findAllTypeOrganizations() {
    return this.typeOrganizationRepository.find();
  }

  async findAllTypeRegimes() {
    return this.typeRegimeRepository.find();
  }

  async findAllTypeLiabilities() {
    return this.typeLiabilityRepository.find();
  }

  async findAllMunicipalities() {
    return this.municipalityRepository.find();
  }
}
