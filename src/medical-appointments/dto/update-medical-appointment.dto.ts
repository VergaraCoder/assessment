import { PartialType } from '@nestjs/swagger';
import { CreateMedicalAppointmentDto } from './create-medical-appointment.dto';

export class UpdateMedicalAppointmentDto extends PartialType(CreateMedicalAppointmentDto) {}
