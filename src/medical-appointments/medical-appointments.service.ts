import { Injectable } from '@nestjs/common';
import { CreateMedicalAppointmentDto } from './dto/create-medical-appointment.dto';
import { UpdateMedicalAppointmentDto } from './dto/update-medical-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalAppointment } from './entities/medical-appointment.entity';
import { Repository } from 'typeorm';
import { ManageError } from 'src/common/errors/custom/custom.error';

@Injectable()
export class MedicalAppointmentsService {

  constructor(
    @InjectRepository(MedicalAppointment)
    private medicalAppointmentRepository: Repository<MedicalAppointment>
  ){}

  async create(createMedicalAppointmentDto: CreateMedicalAppointmentDto) {
    try{
      const medical:MedicalAppointment= this.medicalAppointmentRepository.create(createMedicalAppointmentDto);

      await this.medicalAppointmentRepository.save(medical);

      return medical;
    }catch(err:any){
      throw err;
    }
  }

  async findAll() {
    try{
      const medicals:MedicalAppointment[] | null= await this.medicalAppointmentRepository.find();
      if(medicals.length==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THERE ARE NOT MEDICAL APPOINTMENTS"
        });
      }
      return medicals;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async findOne(id: number) {
    try{
      const medical:MedicalAppointment | null= await this.medicalAppointmentRepository.findOneBy({id});
      if(!medical){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THIS ID NOT EXIST"
        });
      }
      return medical;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async update(id: number, updateMedicalAppointmentDto: UpdateMedicalAppointmentDto) {
    try{
      const {affected}:any= await this.medicalAppointmentRepository.update(id,updateMedicalAppointmentDto);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"FAILED TO UPDATE APPOINTMENT"
        });
      }
      return "PERFECT TO UPDATE APPOINTMENT";
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async remove(id: number) {
    try{
      const {affected}:any= await this.medicalAppointmentRepository.delete(id);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"FAILED TO DELETE APPOINTMENT"
        });
      }
      return "PERFECT TO DELETE APPOINTMENT";
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }
}
