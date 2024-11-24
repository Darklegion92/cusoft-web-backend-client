import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { TypeDocumentIdentification } from '../../catalog/entities/type-document-identification.entity';
import { TypeOrganization } from '../../catalog/entities/type-organization.entity';
import { TypeRegime } from '../../catalog/entities/type-regime.entity';
import { TypeLiability } from '../../catalog/entities/type-liability.entity';
import { Municipality } from '../../catalog/entities/municipality.entity';
import { User } from './user.entity';
import { TypePlans } from './type-plans.entity';
import { Shop } from '@/modules/shops/entities/shop.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'identification_number' })
  identificationNumber: string;

  @Column()
  dv: string;

  @Column({ name: 'language_id' })
  languageId: number;

  @Column({ name: 'tax_id' })
  taxId: number;

  @Column({ name: 'type_environment_id' })
  typeEnvironmentId: number;

  @Column({ name: 'payroll_type_environment_id' })
  payrollTypeEnvironmentId: number;

  @Column({ name: 'eqdocs_type_environment_id' })
  eqdocsTypeEnvironmentId: number;

  @Column({ name: 'type_operation_id' })
  typeOperationId: number;

  @ManyToOne(() => TypeDocumentIdentification)
  @JoinColumn({ name: 'type_document_identification_id' })
  typeDocumentIdentification: TypeDocumentIdentification;

  @Column({ name: 'country_id' })
  countryId: number;

  @Column({ name: 'type_currency_id' })
  typeCurrencyId: number;

  @ManyToOne(() => TypeOrganization)
  @JoinColumn({ name: 'type_organization_id' })
  typeOrganization: TypeOrganization;

  @ManyToOne(() => TypeRegime)
  @JoinColumn({ name: 'type_regime_id' })
  typeRegime: TypeRegime;

  @ManyToOne(() => TypeLiability)
  @JoinColumn({ name: 'type_liability_id' })
  typeLiability: TypeLiability;

  @ManyToOne(() => Municipality)
  @JoinColumn({ name: 'municipality_id' })
  municipality: Municipality;

  @Column({ name: 'merchant_registration' })
  merchantRegistration: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  newpassword: string;

  @Column({ name: 'type_plan_id' })
  typePlanId: number;

  @Column({ name: 'type_plan2_id' })
  typePlan2Id: number;

  @Column({ name: 'type_plan3_id' })
  typePlan3Id: number;

  @Column({ name: 'type_plan4_id' })
  typePlan4Id: number;

  @Column({ name: 'absolut_plan_documents' })
  absolutPlanDocuments: number;

  @Column()
  state: boolean;

  @Column({ name: 'allow_seller_login' })
  allowSellerLogin: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'dealer_id' })
  dealerId: number;

  @ManyToOne(() => TypePlans, typePlans => typePlans.companies)
  @JoinColumn({ name: 'type_plan_id' })
  typePlans: TypePlans;

  @ManyToOne(() => User, user => user.companies)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Shop, shop => shop.company)
  shops: Shop[];

  @Column()
  consumption: number;

  @Column()
  server: number;
}

