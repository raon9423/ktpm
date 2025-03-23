import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesCollectionsComponent } from './fees-collections.component';

describe('FeesCollectionsComponent', () => {
  let component: FeesCollectionsComponent;
  let fixture: ComponentFixture<FeesCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeesCollectionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeesCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
