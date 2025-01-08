import { lastValueFrom } from "rxjs";
import { ConfigService } from "@nestjs/config";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Get, Put, Body, Post, Param, Inject, UseGuards, HttpStatus, Controller, HttpException } from "@nestjs/common";

import { LoginDto } from "./dtos/login.dto";
import { CreateUserDto } from "./dtos/create-user.dto";
import { EditProfileDto } from "./dtos/edit-profile.dto";
import { EditPasswordDto } from "./dtos/edit-password.dto";
import { ResetPasswordDto } from "./dtos/reset-password.dto";
import { RecoverPasswordDto } from "./dtos/recover-password.dto";
import { AuthenticationService } from "./authentication.service";
import { AuthUser } from "../../shared/decorators/user.decorator";
import { JWTAuthGuard } from "../../shared/guards/jwt-auth.guard";
import { UserInterface } from "../users/interfaces/user.interface";
import { UserJwtInterface } from "./interfaces/user-jwt.interface";
import { LoginDocs } from "../../shared/docs/authentication/login.docs";
import { EditProfile } from "../../shared/docs/authentication/edit-profile.docs";
import { VerifyTerms } from "../../shared/docs/authentication/verify-terms.docs";
import { ResetPassword } from "../../shared/docs/authentication/reset-password.docs";
import { AuthenticationTokenExistPipe } from "./validate/authentication-token-exist.pipe";
import { VerifyToken } from "../../shared/docs/authentication/verify-recover-token.docs";
import { RecoverPassword } from "../../shared/docs/authentication/recovery-password.docs";
import { FindUserInformations } from "../../shared/docs/authentication/find-user-informations.docs";

@ApiTags("Autenticação")
@Controller("authentication")
export class AuthenticationController {
  constructor(
    @Inject("EMAILS_SERVICE")
    private readonly client: ClientProxy,

    private readonly configService: ConfigService,

    private readonly service: AuthenticationService
  ) {}

  @LoginDocs()
  @Post("login")
  async login(@Body() data: LoginDto): Promise<{ user: UserJwtInterface; accessToken: string }> {
    return this.service.login(data);
  }

  @Post("create-account")
  async createAccount(@Body() createUserDto: CreateUserDto): Promise<{ message: string }> {
    return this.service.createUser(createUserDto);
  }

  @RecoverPassword()
  @Post("recover-password")
  async recoverPassword(@Body() data: RecoverPasswordDto): Promise<{ message: string }> {
    const { user, token } = await this.service.recoverPassword(data);
    if (user) {
      await lastValueFrom(
        this.client.emit("send_email", {
          subject: "[Clone SX] - Recuperação de Senha do Sistema CloneSX",
          template: "email-recuperar-senha.hbs",
          email: user.email,
          data: {
            token,
            url: await this.configService.get("APP_FRONTEND_URL"),
            name: user.name,
          },
        })
      );
    }

    return {
      message: "A solicitação de recuperação de e-mail foi enviada!",
    };
  }

  @VerifyToken()
  @Get("check-reset-token/:token")
  async checkResetToken(@Param("token", AuthenticationTokenExistPipe) token: string): Promise<UserInterface> {
    return this.service.checkResetToken(token);
  }

  @ResetPassword()
  @Post("reset-password/:token")
  async resetPassword(@Body() data: ResetPasswordDto, @Param("token", AuthenticationTokenExistPipe) token: string): Promise<{ message: string }> {
    return this.service.resetPassword(token, data);
  }

  @Get("profile")
  @ApiBearerAuth()
  @FindUserInformations()
  @UseGuards(JWTAuthGuard)
  async me(@AuthUser() user: UserJwtInterface): Promise<UserJwtInterface> {
    try {
      return user;
    } catch (error) {
      throw new HttpException({ message: "Não foi possível obter os dados do usuário." }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post("edit-profile")
  @ApiBearerAuth()
  @EditProfile()
  @UseGuards(JWTAuthGuard)
  async editProfile(
    @AuthUser() user: UserJwtInterface,
    @Body() data: EditProfileDto
  ): Promise<{
    message: string;
    user: UserJwtInterface;
    accessToken: string;
  }> {
    return this.service.editProfile(user.id, data);
  }

  @Post("edit-password")
  @ApiBearerAuth()
  @EditProfile()
  @UseGuards(JWTAuthGuard)
  async editPassword(@AuthUser() user: UserJwtInterface, @Body() data: EditPasswordDto): Promise<{ message: string }> {
    return this.service.editPassword(user.id, data);
  }

  @Put("term-service/:userId")
  @ApiBearerAuth()
  @VerifyTerms()
  @UseGuards(JWTAuthGuard)
  async hasAgreedPrivacyPolicy(@AuthUser() user: UserJwtInterface): Promise<{
    message: string;
    user: UserJwtInterface;
    accessToken: string;
  }> {
    return await this.service.hasAgreedTermService(user.id);
  }
}
