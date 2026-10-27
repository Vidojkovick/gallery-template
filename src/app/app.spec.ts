import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';

describe('App', () => {
  it('should render the router outlet and the header component', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });

    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const natEl: HTMLElement = fixture.nativeElement;

    expect(natEl.querySelector('app-header')).not.toBeNull();
    expect(natEl.querySelector('main router-outlet')).not.toBeNull();
  });
});
