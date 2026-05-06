import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { AddTodoDto } from './dto/add-todo.dto';
import { Body, NotFoundException } from '@nestjs/common';

@Injectable()
export class TodoService {
  todos: Todo[] = [];
  getTodos() {
    return this.todos;
  }

  getTodoById(id: number): Todo {
    const todo = this.todos.find((t) => t.id === +id); //+id pour convertir id en nombre
    console.log('recuperer un todo par id');
    if (todo) return todo;
    throw new NotFoundException("le todo avec l'id" + id + " n'existe pas");
  }

  addTodo(newTodo: AddTodoDto): Todo {
    let id: number;
    if (this.todos.length) {
      id = this.todos[this.todos.length - 1].id + 1; //dernier id dans le tableau + 1 pour l'incrémenter
    } else {
      id = 1; //si le tableau est vide, le premier id sera 1
    }
    const todo = {
      name: newTodo.name,
      description: newTodo.description,
      id,
    };
    this.todos.push(todo);
    return todo;
  }

  deleteTodoByID(id: number) {
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

  modifierTodo(id: number, newtodo: Partial<AddTodoDto>) {
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

  // partial<todo> : pour dire que les propriétés de l'objet todo sont optionnelles
  // on peut modifier une partie des propriétés du todo sans être obligé de fournir toutes les propriétés lors de la modification
}
