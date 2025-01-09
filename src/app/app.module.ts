import { Module } from "@nestjs/common";

import { CachingProviderModule } from "../providers/caching/caching.provider";
import { GraphQLProviderModule } from "../providers/graphql/graphql.provider";
import { DatabaseProviderModule } from "../providers/database/database.provider";
import { EnvironmentProviderModule } from "../providers/environment/environment.provider";
import { RateLimiterProviderModule } from "../providers/rate-limiter/rate-limiter.provider";

import { MenusModule } from "../modules/menus/menus.module";
import { RolesModule } from "../modules/roles/roles.module";
import { UsersModule } from "../modules/users/users.module";
import { CitiesModule } from "../modules/cities/cities.module";
import { StatesModule } from "../modules/states/states.module";
import { ActionsModule } from "../modules/actions/actions.module";
import { CoursesModule } from "../modules/courses/courses.module";
import { CompaniesModule } from "../modules/companies/companies.module";
import { DashboardModule } from "../modules/dashboard/dashboard.module";
import { ParametersModule } from "../modules/parameters/parameters.module";
import { TermsServiceModule } from "../modules/terms-service/terms-service.module";
import { AuthenticationModule } from "../modules/authentication/authentication.module";

@Module({
  imports: [
    MenusModule,
    RolesModule,
    UsersModule,
    StatesModule,
    CitiesModule,
    ActionsModule,
    CoursesModule,
    CompaniesModule,
    DashboardModule,
    ParametersModule,
    TermsServiceModule,
    AuthenticationModule,
    GraphQLProviderModule,
    CachingProviderModule,
    DatabaseProviderModule,
    EnvironmentProviderModule,
    RateLimiterProviderModule,
  ],
})
export class AppModule {}
