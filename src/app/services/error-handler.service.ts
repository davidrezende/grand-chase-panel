import { stringify } from 'querystring';
import { ToastyService } from 'ng2-toasty';
import { Injectable } from '@angular/core';
import { NotAuthenticatedError } from '../security/gc-http-interceptor';
import { Router } from '@angular/router';

export class NotAuthenticatedErro{}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private toasty: ToastyService,
    private router: Router
    ) { }

  handle(errorResponse: any){
    let msg: string;



    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if(errorResponse instanceof NotAuthenticatedError) {
      msg = 'Sua sessão expirou!';
      this.router.navigate(['/login']);

    } else if (errorResponse.status >= 400 && errorResponse.status <= 500) {

      msg = 'Ocorreu um erro ao processar a sua solicitação';

      console.log('Error: ' + JSON.stringify (errorResponse.error.errors));

      console.log('error aa ' + JSON.stringify (errorResponse.error));

      if(errorResponse.error.errors){
        errorResponse.error.errors.forEach( error =>  {
          this.toasty.error(error.message);
        });
      }


      if(errorResponse.status === 403){
        msg = 'Você não tem premissão para executar essa ação!';
      }

      console.error('Ocorreu um erro', errorResponse);

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', errorResponse);
    }

    this.toasty.error(msg);
  }

}
