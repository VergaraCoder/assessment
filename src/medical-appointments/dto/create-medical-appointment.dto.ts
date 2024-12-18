import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";

export class CreateMedicalAppointmentDto {
    @ApiProperty({
        example:1,
    })
    @IsNotEmpty()
    @IsNumber()
    patientId:number;

    @ApiProperty({
        example:2,
    })
    @IsNotEmpty()
    @IsNumber()
    doctorId:number;

    @ApiProperty({
        example:"Dolor de cabeza",
        description:"todo es mayuscula preferiblemente"
    })
    @IsNotEmpty()
    @IsString()
    reason:string;

    @ApiProperty({
        example:"Dolor de cabeza",
        description:"todo es mayuscula preferiblemente"
    })
    @IsNotEmpty()
    @IsString()
    speciality:string;

    @ApiProperty({
        example:"2024-10-13T20:03:00",
        description:"La fecha debe estar en el mormato ISO AA-MM-DDTHH:MM"
    })
    @IsNotEmpty()
    @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)
    @IsString()
    date:string;
}
