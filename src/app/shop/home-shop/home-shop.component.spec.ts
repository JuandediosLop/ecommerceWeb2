import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeShopComponent } from './home-shop.component';

describe('HomeShopComponent', () => {
  let component: HomeShopComponent;
  let fixture: ComponentFixture<HomeShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeShopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
