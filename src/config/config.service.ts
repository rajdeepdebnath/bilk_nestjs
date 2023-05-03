import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as dotenv from 'dotenv';

dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public getValue(key: string): string {
    const value = this.env[key];
    if (value === undefined) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k));
    return this;
  }

  public getPort() {
    return this.getValue('PORT');
  }

  // Everything returned from env is a string. This function return a boolean for strings "true" and "false"
  public getBooleanFromString(booleanString: string) {
    if (booleanString === 'false') return false;
    else if (booleanString === 'true') return true;
    else {
      throw new Error(
        `Boolean string expected while trying to convert ${booleanString}`,
      );
    }
  }

  public getTypeOrmConfig(): PostgresConnectionOptions {
    return {
      type: 'postgres',
      host: this.getValue('ORM_HOST'),
      port: parseInt(this.getValue('ORM_PORT')),
      username: this.getValue('ORM_USERNAME'),
      password: this.getValue('ORM_PASSWORD'),
      database: this.getValue('ORM_DATABASE'),
      migrationsTableName: 'migration',
      migrations: [this.getValue('ORM_MIGRATIONS')],
      entities: [this.getValue('ORM_ENTITIES')],
      logging: this.getBooleanFromString(this.getValue('ORM_LOGGING')),
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'ORM_CONNECTION',
  'ORM_HOST',
  'ORM_USERNAME',
  'ORM_PASSWORD',
  'ORM_DATABASE',
  'ORM_PORT',
  'ORM_MIGRATIONS',
  'ORM_MIGRATIONS_FOR_CLI',
  'ORM_ENTITIES',
  'JWT_SECRET_KEY',
  'JWT_EXPIRY_TIME',
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'S3_BUCKET_NAME',
]);

export { configService };
