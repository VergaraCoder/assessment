import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/common/decorators/custom/auth.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth() 
  @Auth("admin","doctor")
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth() 
  @Auth("admin","patient","doctor")
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth() 
  @Auth("admin","patient","doctor")
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth() 
  @Auth("admin","patient","doctor")
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
