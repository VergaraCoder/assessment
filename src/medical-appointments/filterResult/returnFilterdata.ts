import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { MedicalAppointment } from "../entities/medical-appointment.entity";
import { ManageError } from "src/common/errors/custom/custom.error";
import { InjectRepository } from "@nestjs/typeorm";

interface querys {
    date:Date;
    reason:string;
    speciality:string;
}


@Injectable()
export class returnResult {

    constructor(
        @InjectRepository(MedicalAppointment)
        private medicalAppointmentRepository: Repository<MedicalAppointment>,
    ){}


    async router(data:querys){

        if(data.date){
            return await this.returnAppointmentByDate(data.date);
        }
        else if(data.reason){
            return await this.returnAppointmentByReason(data.reason);
        }
        else if(data.speciality){
            return await this.returnAppointmentBySpeciality(data.speciality);
        }
    }

    async returnAppointmentByDate(date:any){
        try{     
            const startDate=new Date(date);
            const endDate=new Date(date);
            startDate.setDate(startDate.getDate());
            endDate.setDate(endDate.getDate() + 1);

            const queryBuilder=this.medicalAppointmentRepository.createQueryBuilder("appointments");

            const dataQuery=await queryBuilder.where(
                "appointments.date BETWEEN :startDate AND :endDate",{
                    startDate: startDate,
                    endDate:endDate 
                }
            ).getMany()

            if(dataQuery.length == 0){
                throw new ManageError({
                    type:"NOT_FOUND",
                    message:"THERE ARE NOT APPOINMENTS IN THAT DATE"
                });
            }

            return dataQuery;

        }catch(err:any){
            throw ManageError.signedError(err.message);
        }
    }



    async returnAppointmentByReason(reason:string){
        try{
            const queryBuilder=this.medicalAppointmentRepository.createQueryBuilder("appointments");

            const dataQuery= await queryBuilder.where(
                "appointments.reason =:reason",{
                    reason:reason.toLocaleLowerCase()
                }
            )
            .getMany();

            if(dataQuery.length == 0){
                throw new ManageError({
                    type:"NOT_FOUND",
                    message:"THERE ARE NOT APPOINMENTS WITH THAT REASON"
                });
            }


            return dataQuery;
        }catch(err:any){           
            throw ManageError.signedError(err.message);
        }
    }



    async returnAppointmentBySpeciality(speciality:string){
        try{
            const queryBuilder=this.medicalAppointmentRepository.createQueryBuilder("appointments");

            const dataQuery= await queryBuilder.where(
                "appointments.speciality =:speciality",{
                    speciality:speciality.toLocaleLowerCase()
                }
            )
            .getMany();

            if(dataQuery.length == 0){
                throw new ManageError({
                    type:"NOT_FOUND",
                    message:"THERE ARE NOT APPOINMENTS WITH THAT SPECIALITY"
                });
            }
            return dataQuery;

        }catch(err:any){
            throw ManageError.signedError(err.message);
            
        }
    }
}