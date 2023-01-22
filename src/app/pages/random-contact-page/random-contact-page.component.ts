import { Component } from '@angular/core';
import { IRandomContact, Results } from 'src/app/models/randomuser';

import { RandomUserService } from 'src/app/services/random-user.service';


@Component({
  selector: 'app-random-contact-page',
  templateUrl: './random-contact-page.component.html',
  styleUrls: ['./random-contact-page.component.scss']
})
export class RandomContactPageComponent {

  contact: IRandomContact | undefined;

  constructor(private randomUserService: RandomUserService) {}


  ngOnInit(): void {
    this.randomUserService.obtenerRandomContact().subscribe((response: Results) => {
      this.contact = response.results[0]; // Se lo pasaremos al RandomContact
    })
  }

  obtenerNuevoContacto() {
    // this.randomUserService.obtenerRandomContact().subscribe(
    //   (response: Results) => {
    //   this.contact = response.results[0]; // Se lo pasaremos al RandomContact
    //   },
    //   (error) => console.error(`${error}`) // Este error cual seria?
    // );// el que pusimos que se lanzara en el servicio en la imagen de arriba
    //      en el throwError

      this.randomUserService.obtenerRandomContact().subscribe(
        {
          next: (response: Results) => {
            this.contact = response.results[0];
          },
          error: (error) => console.error(`${error}`),
          complete: () => console.info('Peticion de random contact terminada')
        }
      )
  }

  obtenerListaContactos(n: number) {
    this.randomUserService.obtenerMultipleRandomContacts(n).subscribe(
      {
        next: (response: Results[]) => {
          console.log(response);
        },
        error: (error) => console.error(`${error}`),
        complete: () => console.info('Peticion de multiples random contacts terminada')
      }
    )
  }
}
