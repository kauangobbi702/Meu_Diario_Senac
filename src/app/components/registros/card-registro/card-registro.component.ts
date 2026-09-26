import { Component } from '@angular/core';
import { Registro } from './Registro';

@Component({
  selector: 'app-card-registro',
  standalone: true,
  imports: [],
  templateUrl: './card-registro.component.html',
  styleUrl: './card-registro.component.css'
})
export class CardRegistroComponent {
  registro: Registro = {
    titulo: 'Titulo do Registro',
    conteudo: 'Conteúdo do Registro...',
    data: new Date('2026-09-24')
  }
}
