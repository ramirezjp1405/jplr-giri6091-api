import { Inject, Injectable } from "@nestjs/common";
import { ITaskRepositoryToken } from "../domain/task.repository.interface";
import type { ITaskRepository } from "../domain/task.repository.interface";
import { Task } from "../domain/task.entity";
import { GetTaskByIdUseCase } from "./get.task.by.id.use";

@Injectable()
export class UpdateTaskUseCase {
    
    constructor(
        @Inject(ITaskRepositoryToken) 
        private readonly taskRepository: ITaskRepository,
        private readonly findByIdUseCase: GetTaskByIdUseCase
    ) {}

    async execute(id: number, updateData: Partial<Task>): Promise<Task> {
        const task = await this.findByIdUseCase.execute(id);
        
        if (updateData.title !== undefined) task.title = updateData.title;
        if (updateData.description !== undefined) task.description = updateData.description;
        
        if (updateData.status !== undefined) {
            if (['PENDING', 'IN_PROGRESS', 'COMPLETED'].includes(updateData.status)) {
                task.status = updateData.status;
            } else {
                task.status = updateData.status; 
            }
        }

        
        await this.taskRepository.update(task);
        
        return task;
    }
}