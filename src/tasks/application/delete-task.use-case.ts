import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ITaskRepositoryToken } from "../domain/task.repository.interface";
import type { ITaskRepository } from "../domain/task.repository.interface";

@Injectable()
export class DeleteTaskUseCase {
    constructor(
        @Inject(ITaskRepositoryToken)
        private readonly taskRepository: ITaskRepository
    ) {}

    async execute(id: number): Promise<void> {
        // Primero verificamos que la tarea exista
        const task = await this.taskRepository.findById(id);
        
        if (!task) {
            throw new NotFoundException(`La tarea con id ${id} no existe`);
        }

        // Si la tarea sí existe, ahora sí la borramos
        await this.taskRepository.delete(id);
    }
}