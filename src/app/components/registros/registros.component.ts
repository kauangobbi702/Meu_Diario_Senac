import { Component } from '@angular/core';
import { CardRegistroComponent } from './card-registro/card-registro.component';
import { Registro } from './card-registro/Registro';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registros',
  standalone: true,
  imports: [CardRegistroComponent, NgFor, FormsModule],
  templateUrl: './registros.component.html',
  styleUrl: './registros.component.css'
})

export class RegistrosComponent {
  registrosOrigem: Registro[] = []

  modalSolicitado: boolean = false;

  novoRegistro: Registro = {
    titulo: '',
    conteudo: '',
    data: new Date().toLocaleDateString('sv-SE')
  };

  constructor(private _http: HttpClient) {

  }

  ngOnInit() {
    this._http.get<Registro[]>('http://localhost:4200/api/registros/listar',
      {
        transferCache: false
      }
    )
    .subscribe({
      next: (registros) => {
        this.registrosOrigem = registros;
      },
      error: (error) => {
        console.error('Erro ao buscar registros:', error);
      }
  })}

  adicionarRegistro() {
    this._http.post<Registro>('http://localhost:4200/api/registros/postar', {
      ...this.novoRegistro,
      "usuarioId": 3
    }).subscribe({
      next: (registro) => {
        this.registrosOrigem.push(registro);
        this.modalSolicitado = false;
      }
    })
  }

};

