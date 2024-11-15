import { Module } from '@nestjs/common';
import { MedicalAppointmentsService } from './medical-appointments.service';
import { MedicalAppointmentsController } from './medical-appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalAppointment } from './entities/medical-appointment.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([MedicalAppointment])
  ],
  controllers: [MedicalAppointmentsController],
  providers: [MedicalAppointmentsService],
})
export class MedicalAppointmentsModule {}
