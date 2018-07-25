import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStadiumComponent } from './update-stadium.component';

describe('CreateStadiumComponent', () => {
  let component: UpdateStadiumComponent;
  let fixture: ComponentFixture<UpdateStadiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateStadiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStadiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
