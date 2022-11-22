import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Retorna as informações de perfil do usuário logado" })
  findOne() {
    return this.profileService.findOne();
  }

  @Patch()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Atualiza as informações de perfil do usuário logado" })
  update(@Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(updateProfileDto);
  }
}
