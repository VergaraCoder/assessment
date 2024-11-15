import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { MedicalAppointment } from "src/medical-appointments/entities/medical-appointment.entity";
import { Role } from "src/role/entities/role.entity";
import { User } from "src/user/entities/user.entity";




@Injectable()
export class Credentials implements TypeOrmOptionsFactory{

    constructor(
        private configService:ConfigService
    ){}

    createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        return({
            type: 'mysql',
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USERNAME'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_DATABASE'),
            entities: [
                User,Role,MedicalAppointment
            ],
            synchronize: true,
        });
    }
}