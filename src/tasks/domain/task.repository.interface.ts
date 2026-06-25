import { Task } from "./task.entity";

export interface ITaskRepository {
    create(task: Task): Promise<Task>;
    findAll(): Promise<Task[]>;
    findById(id: number): Promise<Task | null>;
    update(task: Task): Promise<void>;
    delete(id: number): Promise<void>;
}

export const ITaskRepositoryToken = Symbol('ITaskRepository');