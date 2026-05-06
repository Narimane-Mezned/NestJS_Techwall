import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { AddTodoDto } from './dto/add-todo.dto';
import { GetPaginatedDto } from './dto/get-paginated.dto';
@Controller('todo')
export class TodoController {
  todos: Todo[];
  constructor() {
    this.todos = [];
  }
  @Get()
  getTodos(@Query() mesQueryParams: GetPaginatedDto) {
    console.log(mesQueryParams);
    return this.todos;
  }
  @Get('/:id')
  getTodoById(@Param('id') id) {
    const todo = this.todos.find((t) => t.id === +id); //+id pour convertir id en nombre
    console.log('recuperer un todo par id');
    if (todo) return todo;
    throw new NotFoundException("le todo avec l'id" + id + " n'existe pas");
  }
  @Post()
  //je vais pas récupérer l'id du body mais plutot l'incrémenter et l'ajouter au tableau todos
  addTodo(@Body() newTodo: AddTodoDto) {
    const todo = new Todo(); // céer un nouveau objet todo car le newtodo n'a pas d'id
    // on va lui ajouter les propriétés de newtodo:
    todo.name = newTodo.name;
    todo.description = newTodo.description;

    if (this.todos.length) {
      todo.id = this.todos[this.todos.length - 1].id + 1; //dernier id dans le tableau + 1 pour l'incrémenter
    } else {
      todo.id = 1; //si le tableau est vide, le premier id sera 1
    }
    this.todos.push(todo);
    return todo;
  }

  //suppression d'un todo par id
  @Delete('/:id')
  deleteTodoByID(@Param('id') id) {
    //chercher l'objet via son id
    const index = this.todos.findIndex((t) => t.id === +id);
    // utiliser la méthode splice pour la suppression si l'élément existe
    if (index >= 0) {
      this.todos.splice(index, 1); //supprimer l'élément à l'index trouvé , 1 pour supprimer un seul élément
    } else {
      // si l'élément n'est pas trouvé (index=-1) , on lance une erreur 404
      throw new NotFoundException(`le todo d'id ${id} n'est pas trouvé `);
    }
    return `le todo d'id ${id} a été supprimé avec succès`;
  }

  @Put('/:id')
  modifierTodo(@Param('id') id, @Body() newtodo: Partial<AddTodoDto>) {
    const todo = this.getTodoById(id); //récupérer le todo à modifier
    /*
    todo ={
      ...todo ,
      ...newtodo} // ce syntaxe veut dire récupérer tout ce qu'on a dans le todo et dans le newtodo
    en faisant ça , on modifie la référence d'un objet , donc cet objet en question ne va pas etre modifier  */

    //pour éviter ce problème , on va modifier les propriétés de l'objet todo directement :
    todo.name = newtodo.name ? newtodo.name : todo.name;
    todo.description = newtodo.description
      ? newtodo.description
      : todo.description;

    return 'todo modifié avec succès';
  }
}
// partial<todo> : pour dire que les propriétés de l'objet todo sont optionnelles
// on peut modifier une partie des propriétés du todo sans être obligé de fournir toutes les propriétés lors de la modification
