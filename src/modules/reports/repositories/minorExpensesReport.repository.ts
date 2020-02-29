import {MinorExpensesReportEntity} from '../entities/minorExpensesReport.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(MinorExpensesReportEntity)
export class MinorExpensesReportRepository extends Repository<MinorExpensesReportEntity> {}
