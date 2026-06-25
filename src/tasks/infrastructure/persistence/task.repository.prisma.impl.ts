import { PrismaService } from "@/prisma/prisma.service";
import { Task } from "@/tasks/domain/task.entity";
import { ITaskRepository } from "@/tasks/domain/task.repository.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TaskRepositoryPrismaImpl implements ITaskRepository {
    
    constructor(private readonly prismaService: PrismaService) {}

    async create(task: Task): Promise<Task> {
        const { id, ...data } = task;
        const createdTask = await this.prismaService.task.create({
            data: data
        });
        
        return createdTask as unknown as Task;
    }

    async findAll(): Promise<Task[]> {
        throw new Error("Method not implemented.");
    }

    async findById(id: number): Promise<Task | null> {
        throw new Error("Method not implemented.");
    }

    async update(task: Task): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}