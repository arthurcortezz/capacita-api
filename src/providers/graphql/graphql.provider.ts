import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

import { MenusModule } from "../../modules/menus/menus.module";
import { RolesModule } from "../../modules/roles/roles.module";
import { UsersModule } from "../../modules/users/users.module";
import { CitiesModule } from "../../modules/cities/cities.module";
import { StatesModule } from "../../modules/states/states.module";
import { ActionsModule } from "../../modules/actions/actions.module";
import { CompaniesModule } from "../../modules/companies/companies.module";
import { ParametersModule } from "../../modules/parameters/parameters.module";
import { TermsServiceModule } from "../../modules/terms-service/terms-service.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      include: [
        ActionsModule,
        CitiesModule,
        CompaniesModule,
        MenusModule,
        RolesModule,
        StatesModule,
        TermsServiceModule,
        UsersModule,
        ParametersModule,
      ],
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      playground: process.env.APP_MODE === "dev",
      buildSchemaOptions: {
        dateScalarMode: "isoDate",
      },
    }),
  ],
})
export class GraphQLProviderModule {}
