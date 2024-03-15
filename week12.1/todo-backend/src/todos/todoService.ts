import { title } from "process";
import { Todo } from "./todo";

export type todoCreationParams = Pick<Todo, "title" | "description">;
export class Todoservice{
    public get(todoId:string):Todo{
        return {
            id:todoId,
            title:"mocked Todo",
            description:"mocked todo",
            done:false,
        }
    }
    public create(todoCreationParams:todoCreationParams){
        console.log("Mock the db call")
        return {
            id:"4",
            title:"mocked Todo",
            description:"mocked todo",
            done:false,
        }

    }
}