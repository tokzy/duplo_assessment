import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnsToYourEntity1646092123604 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'charge',
      new TableColumn({
        name: 'isReversal',
        type: 'varchar',
        length: '300',
        default: 'false',
      }),
    );

    await queryRunner.addColumn(
      'charge',
      new TableColumn({
        name: 'ReversalTransRef',
        type: 'varchar',
        length: '300',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('charge', 'isReversal');
    await queryRunner.dropColumn('charge', 'ReversalTransRef');
  }
}
