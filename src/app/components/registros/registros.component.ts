import { Component } from '@angular/core';
import { CardRegistroComponent } from './card-registro/card-registro.component';
import { Registro } from './card-registro/Registro';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AutenticacaoService } from '../../services/autenticacao.service';

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

  constructor(private _http: HttpClient, private autenticacaoService : AutenticacaoService) {

  }

  ngOnInit() {
    const token = this.autenticacaoService.retornarToken();

    this._http.get<Registro[]>('http://localhost:4200/api/registros/listar', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
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
    const token = this.autenticacaoService.retornarToken();
    const registroParaAdicionar = { ...this.novoRegistro };
    this._http.post('http://localhost:4200/api/registros/postar', {
      ...this.novoRegistro,
      "usuarioId": 3
    },
    {
      responseType: 'text',
      headers: {
        'Authorization': `Bearer ${token}`
      }}).subscribe({
      next: () => {
        this.registrosOrigem.push(registroParaAdicionar);
        this.modalSolicitado = false;
      },
      error: (error) => {
        console.error('Erro ao adicionar registro:', error);
      }
    })
  }

};
