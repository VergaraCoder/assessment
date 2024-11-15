import { Injectable , CanActivate, ExecutionContext} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MedicalAppointment } from "../entities/medical-appointment.entity";
import { Repository } from "typeorm";
import { CreateMedicalAppointmentDto } from "../dto/create-medical-appointment.dto";
import { ManageError } from "src/common/errors/custom/custom.error";
import { find, Observable } from "rxjs";
import { UserService } from "src/user/user.service";



@Injectable()
export class FilterDoctor implements CanActivate{
    
    constructor(
        private userService:UserService
    ){}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try{
            const request:Request=context.switchToHttp().getRequest();
            const data:CreateMedicalAppointmentDto | any=request.body;
            
            const findDoctor=await this.userService.findOne(data.doctorId);
            
            if(findDoctor.role.name!="doctor"){
                throw new ManageError({
                    type:"UNAUTHORIZED",
                    message:"THE DOCTOR ID IS INCORRECT"
                });
            }

            return true;
        }catch(err:any){
            console.log(err);
            
            throw ManageError.signedError(err.message);
        }
    }
}