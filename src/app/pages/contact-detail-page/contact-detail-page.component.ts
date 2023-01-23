import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRandomContact } from 'src/app/models/randomuser';

@Component({
  selector: 'app-contact-detail-page',
  templateUrl: './contact-detail-page.component.html',
  styleUrls: ['./contact-detail-page.component.scss']
})
export class ContactDetailPageComponent {

  id: any | undefined;
  contacto: IRandomContact | undefined;
  filtroPrevio: string = 'todos';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Vamos a leer los parametros
    this.route.params.subscribe(
      (params: any) => {
        console.log('Params:', params);
        if(params.id) {
          this.id = params.id;
        }
      }
    );
    // Vamos a leer tambien del state el contacto
    if(history.state.data){
      this.contacto = history.state.data;
    }
    if(history.state.filtro) {
      this.filtroPrevio = history.state.filtro;
    }
  }
}
