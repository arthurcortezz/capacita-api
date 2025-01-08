import { Seeder } from "typeorm-extension";
import { DataSource } from "typeorm";

import { UserEntity } from "../../modules/users/entities/user.entity";
import { RolesProtectedEnum } from "../../modules/roles/enum/roles.enum";
import { PersonTypeEnum } from "../../modules/users/enum/person-type.enum";
import { UserAddressEntity } from "../../modules/users/entities/user-address.entity";

export class UsersSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const password =
      "$2a$12$0AI1673xoHjn7nD55DJAfOLjYY0fDAqH1bYwRnfejtFVS7wOgVVqy";

    const repository = dataSource.getRepository(UserEntity);

    const acceptedAt = new Date();
    acceptedAt.setHours(acceptedAt.getHours() + 4);

    const users = [
      {
        name: "Administrador",
        email: "adm@softbase.com",
        password,
        personType: PersonTypeEnum.FISICA,
        identificationNumber: "12345678909",
        phone: "82993443838",
        acceptedAt,
        roleId: RolesProtectedEnum.ADM_GERAL,
        companyId: null,
      },
    ];

    await repository.insert(users);
    const addressRepository =
      dataSource.getRepository(UserAddressEntity);
    await addressRepository.insert([
      {
        street: "Rua Escalas Musicais",
        number: "429",
        complement: null,
        neighborhood: "Jardim Bartira",
        cep: "08161260",
        cityId: 5270,
        userId: 1,
      },
    ]);
  }
}
