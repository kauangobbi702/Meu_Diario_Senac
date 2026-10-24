import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { RegistrosComponent } from './registros.component';

describe('RegistrosComponent', () => {
  let component: RegistrosComponent;
  let fixture: ComponentFixture<RegistrosComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrosComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(RegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock.expectOne('http://localhost:4200/api/registros/listar').flush([]);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add the submitted record when the API responds with text', () => {
    const registro = {
      titulo: 'Meu registro',
      conteudo: 'Anotação',
      data: '2026-10-23'
    };
    component.novoRegistro = registro;

    component.adicionarRegistro();

    const request = httpMock.expectOne('http://localhost:4200/api/registros/postar');
    expect(request.request.responseType).toBe('text');
    expect(request.request.body).toEqual({ ...registro, usuarioId: 3 });
    request.flush('Registro inserido com sucesso');

    expect(component.registrosOrigem).toEqual([registro]);
    expect(component.modalSolicitado).toBeFalse();
  });
});
