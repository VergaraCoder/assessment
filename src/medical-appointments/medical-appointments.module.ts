import { Module } from '@nestjs/common';
import { MedicalAppointmentsService } from './medical-appointments.service';
import { MedicalAppointmentsController } from './medical-appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalAppointment } from './entities/medical-appointment.entity';
import { UserModule } from 'src/user/user.module';
import { FilterData } from './guard/filterData.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([MedicalAppointment]),
    AuthModule,
    UserModule
  ],
  controllers: [MedicalAppointmentsController],
  providers: [
    MedicalAppointmentsService,
    FilterData
  ],
})
export class MedicalAppointmentsModule {}
