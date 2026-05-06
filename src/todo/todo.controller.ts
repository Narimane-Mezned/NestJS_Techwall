import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Query,
} from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { AddTodoDto } from './dto/add-todo.dto';
import { GetPaginatedDto } from './dto/get-paginated.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getTodos(@Query() mesQueryParams: GetPaginatedDto) {
    console.log(mesQueryParams);
    return this.todoService.getTodos();
  }

  @Get('/:id')
  getTodoById(@Param('id') id: string): Todo {
    return this.todoService.getTodoById(+id);
  }

  @Post()
  //je vais pas récupérer l'id du body mais plutot l'incrémenter et l'ajouter au tableau todos
  addTodo(@Body() newTodo: AddTodoDto): Todo {
    return this.todoService.addTodo(newTodo);
  }

  //suppression d'un todo par id
  @Delete('/:id')
  deleteTodoByID(@Param('id') id: string) {
    return this.todoService.deleteTodoByID(+id);
  }

  @Put('/:id')
  modifierTodo(@Param('id') id: string, @Body() newtodo: Partial<AddTodoDto>) {
    return this.todoService.modifierTodo(+id, newtodo);
  }
}
