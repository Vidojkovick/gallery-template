import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoListComponent } from './photo-list.component';
import { PhotoService } from '../../core/services/photos/photo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavoritesService } from '../../core/services/favorites/favorites.service';

describe('PhotoListComponent', () => {
  let fixture: ComponentFixture<PhotoListComponent>;
  let photoService: PhotoService;
  let favoritesService: FavoritesService;
  let snackBar: { open: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    snackBar = { open: vi.fn() };

    TestBed.configureTestingModule({
      providers: [{ provide: MatSnackBar, useValue: snackBar }],
    });

    photoService = TestBed.inject(PhotoService);
    favoritesService = TestBed.inject(FavoritesService);
    fixture = TestBed.createComponent(PhotoListComponent);
    fixture.detectChanges();
  });

  afterEach(() => vi.useRealTimers());

  const el = (): HTMLElement => fixture.nativeElement;

  function setGridRect(bottom: number, height = bottom): void {
    const grid = el().querySelector('app-photo-grid');

    if (!grid) {
      return;
    }

    vi.spyOn(grid, 'getBoundingClientRect').mockReturnValue({ bottom, height } as DOMRect);
  }

  const scroll = () => window.dispatchEvent(new Event('scroll'));

  function finishLoading(): void {
    vi.advanceTimersByTime(300);
    fixture.detectChanges();
  }

  it('should load the first page with a spinner', () => {
    expect(el().querySelector('mat-spinner')).not.toBeNull();

    setGridRect(5000);
    finishLoading();
    expect(el().querySelector('mat-spinner')).toBeNull();
    expect(el().querySelectorAll('button.tile')).toHaveLength(12);
  });

  it('should load the next page when scrolled near the bottom', () => {
    setGridRect(5000);
    finishLoading();
    scroll();
    expect(photoService.loading()).toBe(false);

    setGridRect(window.innerHeight + 100, 5000);
    scroll();
    expect(photoService.loading()).toBe(true);
    finishLoading();
    expect(photoService.photos()).toHaveLength(24);
  });

  it('should add a photo to favorites when it is clicked', () => {
    setGridRect(5000);
    finishLoading();

    const tile = el().querySelector('button.tile') as HTMLButtonElement;
    tile.click();

    expect(favoritesService.favorites()).toHaveLength(1);
    expect(snackBar.open).toHaveBeenLastCalledWith(
      'Added to favorites',
      undefined,
      expect.anything()
    );

    tile.click();
    expect(favoritesService.favorites()).toHaveLength(1);
    expect(snackBar.open).toHaveBeenLastCalledWith(
      'Already in favorites',
      undefined,
      expect.anything()
    );
  })
});
