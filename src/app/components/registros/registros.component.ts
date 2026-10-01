import { Component } from '@angular/core';
import { CardRegistroComponent } from './card-registro/card-registro.component';
import { Registro } from './card-registro/Registro';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-registros',
  standalone: true,
  imports: [CardRegistroComponent, NgFor],
  templateUrl: './registros.component.html',
  styleUrl: './registros.component.css'
})

export class RegistrosComponent {
  registrosOrigem: Registro[] = [
    {
      titulo: 'Um novo começo',
      conteudo: 'Hoje comecei a registrar minhas ideias e experiências.',
      data: new Date('2026-09-25')
    },
    {
      titulo: 'Aprendizado do dia',
      conteudo: 'Pratiquei novos conceitos e avancei no meu projeto.',
      data: new Date('2026-09-26')
    },
    {
      titulo: 'Planos para amanhã',
      conteudo: 'Vou organizar minhas tarefas e continuar estudando.',
      data: new Date('2026-09-27')
    }
  ]
}

