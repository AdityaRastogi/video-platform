import {TestBed} from '@angular/core/testing';

import {PlaylistService} from './playlist.service';

let service;
describe('PlaylistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  beforeEach(() => {
    service = TestBed.get(PlaylistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have setPlaylist() method', () => {
    expect(service.setPlayList).toBeDefined();
  });
});
