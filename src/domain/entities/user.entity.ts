export class UserEntity {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: UserEntity) {
    Object.assign(this, props);
  }
}
