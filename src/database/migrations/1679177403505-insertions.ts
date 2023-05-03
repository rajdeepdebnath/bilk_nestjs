import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertions1679177403505 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            insert into "enum_company_permission" ("name")
            values ('Admin'),
                   ('Full Access'),
                   ('Limited Access');

            insert into "enum_corp_type" ("name")
            values ('Brokerage'),
                   ('Brand');

            insert into "country" ("name")
            values ('United States'),
                   ('Canada');

            insert into "region" ("name", "country")
            values
            ('National',	'Canada'),
            ('Western Canada',	'Canada'),
            ('Quebec',	'Canada'),
            ('Eastern Canada',	'Canada'),
            ('National',	'United States'),
            ('Southwest',	'United States'),
            ('Midwest',	'United States'),
            ('Rocky Mountain',	'United States'),
            ('South',	'United States'),
            ('Pacific Northwest',	'United States'),
            ('West',	'United States'),
            ('Southeast',	'United States'),
            ('Northeast',	'United States');

            insert into "enum_retailer_status" ("name")
            values ('Active'),
                   ('Inactive');

            insert into "subject" ("name")
            values ('Admin'),
              ('Retailer');

            insert into "permission" ("subject_name","action")
            values ('Admin', 'create'),
            ('Admin', 'read'),
            ('Admin', 'update'),
            ('Admin', 'delete'),
            ('Retailer', 'create'),
            ('Retailer', 'read'),
            ('Retailer', 'update'),
            ('Retailer', 'delete');

            insert into "user" ("first_name","email", "password","is_admin")
            values ('Admin', 'admin@the_blik.com', '$2a$10$Io06uw..vNa2nHJW/gDf7efe86od4cPEMeDBGnC4xTF8XEuFa16Te', true);
        `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
