import { Controller, Delete, Get, Post, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
@Controller('todo')
export class TodoController {
  @Get()
  getTodos() {
    console.log('recuperer la liste des todos');
    return 'liste des todos';
  }
  @Get('version2')
  getTodos_V2(@Req() request: Request, @Res() response: Response) {
    //console.log(request);
    console.log('recuperer la liste des todos');
    //console.log(response);
    response.status(205);
    response.json({
      contenu:
        'je suis une réponse générée à partir de l objet Response de express',
    });
  }
  @Post()
  addTodo() {
    console.log('ajouter un todo');
    return 'todo ajouté';
  }
  @Delete()
  deleteTodo() {
    console.log('Supprimer un todo');
    return 'todo supprimé';
  }
}
