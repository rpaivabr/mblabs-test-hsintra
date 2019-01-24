import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarIngressosComponent } from './listar-ingressos.component';

describe('ListarIngressosComponent', () => {
  let component: ListarIngressosComponent;
  let fixture: ComponentFixture<ListarIngressosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarIngressosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarIngressosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
