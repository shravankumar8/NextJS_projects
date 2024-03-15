// src/users/usersController.ts
import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";
import { Todo } from "./todo";
import { todoCreationParams, Todoservice } from "./todoService";
import path from "path";
@Route("todo")
export class TodoController extends Controller {
  @Get("{todoId}")
  public async getTodo(
      @path() todoId: string

      ):Promise<Todo> {
          let todoService =new Todoservice();
          return todoService.get(todoId )
  }
} 
