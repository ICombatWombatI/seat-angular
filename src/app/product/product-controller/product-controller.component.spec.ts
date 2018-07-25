import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductControllerComponent } from './product-controller.component';

describe('ProductControllerComponent', () => {
  let component: ProductControllerComponent;
  let fixture: ComponentFixture<ProductControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
