import { Injectable , CanActivate, ExecutionContext} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MedicalAppointment } from "../entities/medical-appointment.entity";
import { Repository } from "typeorm";
import { CreateMedicalAppointmentDto } from "../dto/create-medical-appointment.dto";
import { ManageError } from "src/common/errors/custom/custom.error";
import { Observable } from "rxjs";



@Injectable()
export class FilterDate implements CanActivate{
    
    constructor(
        @InjectRepository(MedicalAppointment)
        private medicalAppointmentRepository: Repository<MedicalAppointment>
    ){}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try{
            const builder=this.medicalAppointmentRepository.createQueryBuilder("appointment");
            const request:Request=context.switchToHttp().getRequest();

            const data:CreateMedicalAppointmentDto | any=request.body;
            
            console.log("ENTER TO VERIFY DATE");
            console.log(data.doctorId);
            console.log(data.date);
            const date2:Date = new Date(data.date)
            
            const startDate = new Date(date2.getTime() - 15 * 60 * 1000);

            const endDate = new Date(date2.getTime() + 15 * 60 * 1000); 

                const dataBuilder: any = await builder
                .where(
                  `appointment.date BETWEEN :startDate AND :endDate AND appointment.doctorId = :doctorId`,
                  {
                    startDate: startDate,  
                    endDate: endDate,      
                    doctorId: data.doctorId, 
                  }
                )
                .getMany();
            
        
            if(dataBuilder.length > 0){
                throw new ManageError({
                    type:"CONFLICT",
                    message:"THE DOCTOR ALREADY HAS AN APPOINTMENT AT THAT TIME"
                });
            }

            const dateAppointment=new Date(data.date);

            request["date"]=dateAppointment;
            console.log("PASS");

            return true;
        }catch(err:any){
            console.log(err);
            
            throw ManageError.signedError(err.message);
        }
    }
}