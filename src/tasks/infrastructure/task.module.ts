import { Module } from '@nestjs/common'
import { TasksController } from './controllers/tasks.controllers'
import { TaskRepositoryImpl } from './persistence/task.repository.impl'
import { CreateTaskUseCase } from '../application/create.task.use.case'
import { ITaskRepositoryToken } from '../domain/task.repository.interface'
import { DeleteTaskUseCase } from '../application/delete-task.use-case'
import { UpdateTaskUseCase } from '../application/update.task.use.case'
import { GetTaskByIdUseCase } from '../application/get.task.by.id.use'

@Module({
    controllers: [TasksController],
    providers: [
        CreateTaskUseCase,
        GetTaskByIdUseCase,
        UpdateTaskUseCase,
        DeleteTaskUseCase,
        {
            provide: ITaskRepositoryToken,
            useClass: TaskRepositoryImpl
        }
    ],
    exports: [CreateTaskUseCase]
})
export class TaskModule {}