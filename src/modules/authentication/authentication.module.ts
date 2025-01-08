import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { ClientsModule } from "@nestjs/microservices";
import { emailMicroserviceConfig } from "../../config/rabbitmq/rabbitmq.config";

import { JwtStrategy } from "../../providers/authentication/jwt.strategy";

import { UsersModule } from "../users/users.module";
import { UserEntity } from "../users/entities/user.entity";

import { AuthenticationService } from "./authentication.service";
import { AuthenticationController } from "./authentication.controller";
import { UserAddressEntity } from "../users/entities/user-address.entity";
import { ViewMenuByUserRolesEntity } from "./entities/view-menu-by-user-roles.entity";
import { AuthenticationTokenExistPipe } from "./validate/authentication-token-exist.pipe";
import { ViewPrivilegesByUserRolesEntity } from "./entities/view-privileges-by-user-roles.entity";
import { AuthenticationCpfAlreadyExist } from "./validate/authentication-cpf-already-exist.constraint";
import { AuthenticationEmailAlreadyExist } from "./validate/authentication-email-already-exist.constraint";

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    ClientsModule.register([emailMicroserviceConfig]),
    TypeOrmModule.forFeature([UserEntity, UserAddressEntity, ViewMenuByUserRolesEntity, ViewPrivilegesByUserRolesEntity]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.APP_SECRET,
      signOptions: {
        expiresIn: "1d",
        algorithm: "HS384",
      },
      verifyOptions: {
        algorithms: ["HS384"],
      },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, AuthenticationTokenExistPipe, AuthenticationEmailAlreadyExist, AuthenticationCpfAlreadyExist, JwtStrategy],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
