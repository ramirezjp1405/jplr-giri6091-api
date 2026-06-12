import { Task } from "../../domain/task.entity";
import { ITaskRepository } from "../../domain/task.repository.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TaskRepositoryImpl implements ITaskRepository {
    private tasks: Task[] = [];

    async create(task: Task): Promise<Task> {
        this.tasks.push(task);
        return task;
    }

    async findAll(): Promise<Task[]> {
        return this.tasks;
    }

    async findById(id: string): Promise<Task | null> {
        return this.tasks.find(task => task.id === id) || null;
    }
    async update(tupdate: Task): Promise<void> {
        const index = this.tasks.findIndex(t => t.id === tupdate.id)
        if (index !== -1) {
            this.tasks[index] = tupdate
        }
    }

    async delete(id: string): Promise<void> {
        const index = this.tasks.findIndex(task => task.id === id)
        if (index !== -1) {
            this.tasks.splice(index, 1)
        }
    }
}
