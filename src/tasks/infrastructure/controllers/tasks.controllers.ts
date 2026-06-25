import { Controller, Inject, Get, Post, Body, HttpStatus, Param, Patch, Delete, HttpCode, ParseIntPipe } from "@nestjs/common"
import { CreateTaskUseCase } from "../../application/create.task.use.case"
import { UpdateTaskUseCase } from "../../application/update.task.use.case"
import { DeleteTaskUseCase } from "../../application/delete-task.use-case"
import { GetTaskByIdUseCase  } from "../../application/get.task.by.id.use"
import { ITaskRepositoryToken } from "../../domain/task.repository.interface"
import type { ITaskRepository } from "../../domain/task.repository.interface"
import {  ApiOperation, ApiParam, ApiRequestTimeoutResponse, ApiResponse, ApiTags } from "@nestjs/swagger"
import { CreateTaskDto } from "./dtos/create-task.dto"
import { Task } from "@/tasks/domain/task.entity"
import { UpdateTaskDto } from "./dtos/update-task.dto"


@ApiTags("Tasks")
@Controller({path: "tasks", version: "1"})
export class TasksController {
    
    constructor(
        private readonly createTaskUseCase: CreateTaskUseCase,
        private readonly getTaskByIdUseCase: GetTaskByIdUseCase,
        private readonly updateTaskUseCase: UpdateTaskUseCase,
        private readonly deleteTaskUseCase: DeleteTaskUseCase,
        @Inject(ITaskRepositoryToken)
        private readonly taskRepositoryImpl: ITaskRepository
    ) {}

    @Get()
    @ApiOperation({ summary: "Listar todas las tareas" })
    async findAll() {
        return this.taskRepositoryImpl.findAll()
    }

    @Post()
    @ApiOperation({ summary: "Crear una nueva tarea" })
    @ApiResponse({ status: 201, description: "creada exitosamente." })
    async create(@Body() task: CreateTaskDto) {
        return this.createTaskUseCase.execute(task.title, task.description)
    }

    @Get(":id")
    @ApiOperation({ summary: "Obtener una tarea por ID" })
    @ApiParam({ name: 'id', description: 'ID de la tarea (UUID)' })
    @ApiResponse({ status: HttpStatus.OK, description: "Tarea encontrada." })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Tarea no encontrada." })
    async findOne(@Param("id", ParseIntPipe)id:number) {
        return this.getTaskByIdUseCase.execute(id)
    }

    @Patch(":id")
    @ApiOperation({ summary: "Actualizar una tarea por ID" })
    @ApiParam({ name: 'id', description: 'ID de la tarea (UUID)' })
    async update(@Param("id") id: string, @Body() updateTask: UpdateTaskDto) {

    }


    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: "Eliminar una tarea por ID" })
    @ApiParam({ name: 'id', description: 'ID de la tarea (UUID)' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: "Tarea eliminada" })
    async delete(@Param("id", ParseIntPipe)id:number) {
        return this.deleteTaskUseCase.execute(id)
    }
}