import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number | undefined

  @Column({ type: 'varchar' })
  name: string | undefined

  @Column({ type: 'int'})
  age: number | undefined

  @Column({ type: 'varchar', nullable: true }) // nullable，非必须
  hobby: string | undefined
}