import { TestBed } from '@angular/core/testing';
import { PhotoService } from './photo.service';

describe('PhotoService', () => {
  let service: PhotoService;

  beforeEach(() => {
    vi.useFakeTimers();
    service = TestBed.inject(PhotoService);
  });

  afterEach(() => vi.useRealTimers());

  it('should load a page of 12 photos after 200-300ms', () => {
    service.loadMorePhotos();
    expect(service.loading()).toBe(true);

    vi.advanceTimersByTime(199);
    expect(service.photos()).toHaveLength(0);

    vi.advanceTimersByTime(101);
    expect(service.photos()).toHaveLength(12);
    expect(service.loading()).toBe(false);
  });

  it('should append new pages with different photos', () => {
    service.loadMorePhotos();
    vi.advanceTimersByTime(300);
    service.loadMorePhotos();
    vi.advanceTimersByTime(300);

    const ids = service.photos().map((p) => p.id);
    expect(new Set(ids).size).toBe(24);
  });

  it('should ignore loadMorePhotos() while a page is loading', () => {
    service.loadMorePhotos();
    service.loadMorePhotos();

    vi.advanceTimersByTime(300);

    expect(service.photos()).toHaveLength(12);
  });
});
