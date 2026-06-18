import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";



export class CreateTaskDto {
    
     @ApiProperty({
        description: "Estado actual de la tarea",
        enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'],
        example: 'IN_PROGRESS',
        required: false,
    })

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    title!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    description!: string;
}