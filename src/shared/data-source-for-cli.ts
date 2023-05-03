import { DataSource } from 'typeorm';
import { configService } from '../config/config.service';

const typeormConfig = configService.getTypeOrmConfig();

export const dataSource = new DataSource({
  ...typeormConfig,
  migrations: [configService.getValue('ORM_MIGRATIONS_FOR_CLI')],
});
