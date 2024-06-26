import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WhoLikeYourPostDialogComponent } from './who-like-your-post-dialog.component';

describe('WhoLikeYourPostDialogComponent', () => {
  let component: WhoLikeYourPostDialogComponent;
  let fixture: ComponentFixture<WhoLikeYourPostDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WhoLikeYourPostDialogComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WhoLikeYourPostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
