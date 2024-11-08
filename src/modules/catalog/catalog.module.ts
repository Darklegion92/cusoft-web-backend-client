import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { TypeDocumentIdentification } from './entities/type-document-identification.entity';
import { TypeOrganization } from './entities/type-organization.entity';
import { TypeRegime } from './entities/type-regime.entity';
import { TypeLiability } from './entities/type-liability.entity';
import { Municipality } from './entities/municipality.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TypeDocumentIdentification,
      TypeOrganization,
      TypeRegime,
      TypeLiability,
      Municipality,
    ]),
  ],
  controllers: [CatalogController],
  providers: [CatalogService],
  exports: [CatalogService],
})
export class CatalogModule {}