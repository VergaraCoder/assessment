import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicalAppointmentsService } from './medical-appointments.service';
import { CreateMedicalAppointmentDto } from './dto/create-medical-appointment.dto';
import { UpdateMedicalAppointmentDto } from './dto/update-medical-appointment.dto';
import { Auth } from 'src/common/decorators/custom/auth.decorator';

@Controller('medical-appointments')
export class MedicalAppointmentsController {
  constructor(private readonly medicalAppointmentsService: MedicalAppointmentsService) {}

  @Post()
  @Auth("admin","patient","doctor")
  async create(@Body() createMedicalAppointmentDto: CreateMedicalAppointmentDto) {
    return await this.medicalAppointmentsService.create(createMedicalAppointmentDto);
  }

  @Get()
  async findAll() {
    return await this.medicalAppointmentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.medicalAppointmentsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMedicalAppointmentDto: UpdateMedicalAppointmentDto) {
    return await this.medicalAppointmentsService.update(+id, updateMedicalAppointmentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.medicalAppointmentsService.remove(+id);
  }
}
