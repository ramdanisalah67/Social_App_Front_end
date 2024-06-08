import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfirmRejectRequestFriendComponent } from './confirm-reject-request-friend.component';

describe('ConfirmRejectRequestFriendComponent', () => {
  let component: ConfirmRejectRequestFriendComponent;
  let fixture: ComponentFixture<ConfirmRejectRequestFriendComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmRejectRequestFriendComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmRejectRequestFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
