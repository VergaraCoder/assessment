import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './jwt/guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }
  @Post("login")
  @UseGuards(LocalGuard)
  async createToken(@Body() data:any){
    return await this.authService.creationOfToken(data);
  }
}