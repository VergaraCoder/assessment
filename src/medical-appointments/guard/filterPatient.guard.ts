import { Injectable , CanActivate, ExecutionContext} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MedicalAppointment } from "../entities/medical-appointment.entity";
import { Repository } from "typeorm";
import { CreateMedicalAppointmentDto } from "../dto/create-medical-appointment.dto";
import { ManageError } from "src/common/errors/custom/custom.error";
import { find, Observable } from "rxjs";
import { UserService } from "src/user/user.service";



@Injectable()
export class FilterPatient implements CanActivate{
    
    constructor(
        private userService:UserService
    ){}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try{
            const request:Request=context.switchToHttp().getRequest();
            const data:CreateMedicalAppointmentDto | any=request.body;
          
            const findPatient=await this.userService.findOne(data.patientId);
            
            if(findPatient.role.name!="patient"){
                throw new ManageError({
                    type:"UNAUTHORIZED",
                    message:"THE PATIENT ID IS INCORRECT"
                });
            }

            return true;
        }catch(err:any){
            throw ManageError.signedError(err.message);
        }
    }
}