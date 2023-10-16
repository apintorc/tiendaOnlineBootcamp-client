import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoProductosComponent } from './mantenimiento-productos.component';

describe('MantenimientoProductosComponent', () => {
  let component: MantenimientoProductosComponent;
  let fixture: ComponentFixture<MantenimientoProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantenimientoProductosComponent]
    });
    fixture = TestBed.createComponent(MantenimientoProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
