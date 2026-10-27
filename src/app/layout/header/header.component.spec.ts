import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Component } from '@angular/core';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideRouter } from '@angular/router';
import { FavoritesService } from '../../core/services/favorites/favorites.service';
import { PhotoService } from '../../core/services/photos/photo.service';

@Component({ template: '' })
class DummyComponent {}

describe('HeaderComponent', () => {
  let routerHarness: RouterTestingHarness;
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let favoritesService: FavoritesService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideRouter([
          { path: '', component: DummyComponent },
          { path: 'favorites', component: DummyComponent },
          { path: 'photo/:id', component: DummyComponent },
        ])
      ]
    });

    routerHarness = await RouterTestingHarness.create();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    favoritesService = TestBed.inject(FavoritesService);

    await fixture.whenStable();

    favoritesService.addFavorite(PhotoService.createPhoto('a'));
    fixture.detectChanges();
  });

  it.each([
    ['/', '/'],
    ['/favorites', '/favorites'],
    ['/photo/abc', '/favorites'],
  ])('when on "%s" highlights the "%s" link', async (url, expected) => {
    await routerHarness.navigateByUrl(url);

    const isActive = fixture.nativeElement.querySelector('a.is-active')?.getAttribute('href');

    expect(isActive).toBe(expected);
  });

  it('should show the number of favorites', () => {
    expect(fixture.nativeElement.querySelector('.mat-badge-content').textContent.trim()).toBe('1');
  });
});
