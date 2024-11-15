import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
