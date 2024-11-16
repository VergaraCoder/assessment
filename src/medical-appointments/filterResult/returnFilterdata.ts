import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { MedicalAppointment } from "../entities/medical-appointment.entity";
import { ManageError } from "src/common/errors/custom/custom.error";
import { InjectRepository } from "@nestjs/typeorm";



@Injectable()
export class returnResult {

    constructor(
        @InjectRepository(MedicalAppointment)
        private medicalAppointmentRepository: Repository<MedicalAppointment>,
    ){}
    async returnAppointmentByDate(date:any){
        try{
            console.log("enter to retun results");
            console.log(date.date);
            
            const startDate=new Date(date.date);
            const endDate=new Date(date.date);
            startDate.setDate(startDate.getDate());

            endDate.setDate(endDate.getDate() + 1);

            const queryBuilder=this.medicalAppointmentRepository.createQueryBuilder("appointments");

            const dataQuery= await queryBuilder.where(
                "appointments.date BETWEEN :startDate AND :endDate",{
                    startDate: startDate,
                    endDate:endDate 
                }
            )
            .getMany();

            if(dataQuery.length == 0){
                throw new ManageError({
                    type:"NOT_FOUND",
                    message:"THERE ARE NOT APPOINMENTS IN THAT DATE"
                });
            }

            console.log(dataQuery.length);

            return dataQuery;
        }catch(err:any){
            console.log(err);
            
            throw ManageError.signedError(err.message);
        }
    }
}