import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureProductComponent } from './configure-product.component';

describe('ConfigureProductComponent', () => {
  let component: ConfigureProductComponent;
  let fixture: ComponentFixture<ConfigureProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('create product', () => {
  //   expect(component).toBeTruthy();
  // });
});
