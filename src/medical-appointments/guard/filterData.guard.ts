import { Injectable , CanActivate, ExecutionContext} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MedicalAppointment } from "../entities/medical-appointment.entity";
import { Repository } from "typeorm";
import { CreateMedicalAppointmentDto } from "../dto/create-medical-appointment.dto";
import { ManageError } from "src/common/errors/custom/custom.error";
import { Observable } from "rxjs";



@Injectable()
export class FilterData implements CanActivate{
    
    constructor(
        @InjectRepository(MedicalAppointment)
        private medicalAppointmentRepository: Repository<MedicalAppointment>
    ){}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try{
            const builder=this.medicalAppointmentRepository.createQueryBuilder("appointment");
            const request:Request=context.switchToHttp().getRequest();

            const data:CreateMedicalAppointmentDto | any=request.body;
            console.log(data);
            
            const dataBuilder:any=await builder.where(
                `appointment.date BETWEEN :newAppoinment AND appointment.doctorId = :doctor`,{newAppoinment:data.date, doctor:data.doctorId})
                .getMany();
                
            console.log("ENTER");
            console.log(dataBuilder);
            
        
            if(dataBuilder.length > 0){
                throw new ManageError({
                    type:"CONFLICT",
                    message:"THE DOCTOR ALREADY HAS AN APPOINTMENT AT THAT TIME"
                });
            }
            console.log("PASS");
            const dateAppointment=new Date(data.date);
            request["date"]=dateAppointment;
            return true;
        }catch(err:any){
            console.log(err);
            
            throw ManageError.signedError(err.message);
        }
    }
}