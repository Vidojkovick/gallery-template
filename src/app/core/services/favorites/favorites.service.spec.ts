import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';
import { PhotoService } from '../photos/photo.service';
import { EffectType } from '../../models/photo.model';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    localStorage.clear();
    service = TestBed.inject(FavoritesService);
  });

  it('should add photos > newest first and ignore duplicates', () => {
    expect(service.addFavorite(PhotoService.createPhoto('a'))).toBe(true);
    expect(service.addFavorite(PhotoService.createPhoto('b'))).toBe(true);
    expect(service.addFavorite(PhotoService.createPhoto('a'))).toBe(false);

    expect(service.favorites().map((p) => p.id)).toEqual(['b', 'a']);
    expect(service.ids().has('a')).toBe(true);
    expect(service.getById('b')).toEqual(PhotoService.createPhoto('b'));
  });

  it('should remove a photo', () => {
    service.addFavorite(PhotoService.createPhoto('a'));

    service.removeFavorite('a');
    expect(service.favorites()).toEqual([]);
  });
  
   it.each([
    ['none', EffectType.None],
    ['grayscale', EffectType.Grayscale],
    ['blur', EffectType.Blur]
  ])('should apply "%s" effect on both urls', (_name, type) => {
    const mockPhoto = PhotoService.createPhoto('a'); 
    const effect = service.applyEffect(mockPhoto, type);

    expect(effect?.fullUrl).toEqual(mockPhoto.fullUrl + type);
    expect(effect?.thumbnailUrl).toEqual(mockPhoto.thumbnailUrl + type);
  });

  it('should keep favorites after a refresh', () => {
    service.addFavorite(PhotoService.createPhoto('a'));
    TestBed.resetTestingModule();

    service = TestBed.inject(FavoritesService);
    expect(service.favorites()).toHaveLength(1);
  });

  it('should start empty if data is corrupt', () => {
    localStorage.setItem('favorites', '{broken json');

    TestBed.resetTestingModule();
    service = TestBed.inject(FavoritesService);

    expect(service.favorites()).toEqual([]);
  });
});
