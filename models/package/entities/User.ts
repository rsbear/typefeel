import { Entity, PrimaryKey, Property } from 'mikro-orm'

@Entity()
export class User {
  @PrimaryKey()
  id!: string;

  @Property({ unique: true })
  email: string;
}