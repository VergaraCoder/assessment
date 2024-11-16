import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("appointments")
export class MedicalAppointment {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    patientId:number;

    @Column()
    doctorId:number;

    @Column()
    reason:string;

    @Column()
    date:Date;

    @Column()
    speciality:string;

    @ManyToOne(()=>User,user=>user.appointmentsPatient,{eager:true})
    userPatient:User;

    @ManyToOne(()=>User,user=>user.appointmentsDcotor,{eager:true})
    userDoctor:User;
}
