import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { MedicalAppointmentsService } from './medical-appointments.service';
import { CreateMedicalAppointmentDto } from './dto/create-medical-appointment.dto';
import { UpdateMedicalAppointmentDto } from './dto/update-medical-appointment.dto';
import { Auth } from 'src/common/decorators/custom/auth.decorator';
import { FilterDate } from './guard/filterData.guard';
import { FilterDoctor } from './guard/filterDoctor.guard';
import { FilterPatient } from './guard/filterPatient.guard';
import { returnResult } from './filterResult/returnFilterdata';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@Controller('medical-appointments')
export class MedicalAppointmentsController {
  constructor(
    private readonly medicalAppointmentsService: MedicalAppointmentsService,
    private readonly filterResults: returnResult

  ) {}

  @Post()
  @ApiBearerAuth() 
  @UseGuards(FilterDate,FilterDoctor,FilterPatient)
  @Auth("admin","patient","doctor")
  async create(@Body() createMedicalAppointmentDto: CreateMedicalAppointmentDto, @Req() request:Request) {

    const dateAppointment=request["date"];
    
    return await this.medicalAppointmentsService.create({...createMedicalAppointmentDto,date:dateAppointment});
  }

  @Get()
  @ApiBearerAuth() 
  @Auth("admin","doctor")
  @ApiQuery({ 
    name: 'date', 
    type: String, 
    description: 'Date for filter appointment', 
    required:false,
    example:"2024-10-14"
  })
  @ApiQuery({ 
    name: 'reason', 
    type: String, 
    description: 'reason for filter appointment', 
    required:false,
    example:"dolor de cabeza"
  })
  @ApiQuery({ 
    name: 'speciality', 
    type: String, 
    description: 'speciality for filter appointment', 
    required:false,
    example:"urologo"
  })
  async findAll(
    @Query("date") date:Date,
    @Query("reason") reason:string,
    @Query("speciality") speciality:string,
  ) {
    if(date || reason || speciality){
      return await this.filterResults.router({
        date:date,reason:reason,speciality:speciality
      });
    }
    return await this.medicalAppointmentsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth() 
  @Auth("admin","patient","doctor")
  async findOne(@Param('id') id: string) {
    return await this.medicalAppointmentsService.findOne(+id);
  }


  @Patch(':id')
  @ApiBearerAuth() 
  @Auth("admin","patient","doctor")
  async update(@Param('id') id: string, @Body() updateMedicalAppointmentDto: UpdateMedicalAppointmentDto) {
    return await this.medicalAppointmentsService.update(+id, updateMedicalAppointmentDto);
  }

  @Delete(':id')
  @ApiBearerAuth() 
  @Auth("admin","doctor")
  async remove(@Param('id') id: string) {
    return await this.medicalAppointmentsService.remove(+id);
  }
}
