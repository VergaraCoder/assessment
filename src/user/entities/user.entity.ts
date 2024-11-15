import { Role } from "src/role/entities/role.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { MedicalAppointment } from "src/medical-appointments/entities/medical-appointment.entity";
@Entity("users")
@Unique(["email"])
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column()
    roleId:number;

    @Column()
    idNumber:string;

    @Column()
    age:number;

    @Column()
    telephone:string;

    @ManyToOne(()=>Role,role=>role.user,{eager:true})
    role:Role;

    @OneToMany(()=>MedicalAppointment,appointment=>appointment.userPatient)
    appointmentsPatient:MedicalAppointment[];

    @OneToMany(()=>MedicalAppointment,appointment=>appointment.userDoctor)
    appointmentsDcotor:MedicalAppointment[];
}
