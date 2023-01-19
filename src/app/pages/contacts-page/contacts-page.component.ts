import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { IContacto } from 'src/app/models/contact.interface';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent implements OnInit {

  filtroSexo: string = 'todos';
  listaContactos: IContacto[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private contactService: ContactService) {}

  ngOnInit(): void {
    // Obtenemos los query params
    this.route.queryParams.subscribe((params: any) => {
      if(params.sexo) {
        this.filtroSexo = params.sexo;
      }
    })
    // Obtenemos la lista de contactos
    this.contactService.obtenerContactos(this.filtroSexo)
      .then(
        (lista) => this.listaContactos = lista
      )
      .catch((error) => console.error(`Ha habido un error al obtener los contactos: ${error}`))
      .finally(() => console.info('Peticion de contactos terminada'))
  }

  // Ejemplo de paso de informacion entre componentes a traves del ESTADO
  volverAHome(contacto: IContacto) {
    let navigationExtras: NavigationExtras = {
      state: {
        data: contacto
      }
    }
    this.router.navigate(['/home'], navigationExtras);
  }

  //
}
