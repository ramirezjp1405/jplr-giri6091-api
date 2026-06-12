import { PartialType } from "@nestjs/mapped-types"
import { CreateTaskDto } from "./create-task.dto"
import { ApiProperty } from "@nestjs/swagger"
import { IsEAN, IsEnum, IsOptional } from "class-validator"

export class UpdateTaskDto extends PartialType(CreateTaskDto) {

    @ApiProperty({
        description: "Estado actual de la tarea",
        enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'],
        example: 'IN_PROGRESS',
        required: false,
    })
   @IsEnum(['PENDING', 'IN_PROGRESS', 'COMPLETED'], {
     message: 'Solo se permiten los valores: PENDING, IN_PROGRESS o COMPLETED' })
    @IsOptional()
    status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
}