import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockerComponent } from './mocker.component';

describe('MockerComponent', () => {
  let component: MockerComponent;
  let fixture: ComponentFixture<MockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MockerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
