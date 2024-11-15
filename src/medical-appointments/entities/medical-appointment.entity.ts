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
    affair:string;

    @Column()
    date:Date;

    @ManyToOne(()=>User,user=>user.appointmentsPatient)
    userPatient:User;

    @ManyToOne(()=>User,user=>user.appointmentsDcotor)
    userDoctor:User;
}
