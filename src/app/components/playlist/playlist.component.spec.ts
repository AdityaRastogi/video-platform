import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlaylistComponent} from './playlist.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {PlaylistService} from '../../shared/playlist.service';

describe('PlaylistComponent', () => {
  let component: PlaylistComponent;
  let fixture: ComponentFixture<PlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlaylistComponent],
      providers: [ PlaylistService ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('when component is initialised', () => {
    it('should have div with class "playlist-container"', async(() => {
      const app = fixture.debugElement.nativeElement;
      expect(app.querySelector('div.playlist-container')).toBeTruthy();
    }));

    it('should have app-create-playlist and app-add-video tags', async(() => {
      const app = fixture.debugElement.nativeElement;
      expect(app.querySelector('app-create-playlist')).toBeTruthy();
      expect(app.querySelector('app-add-video')).toBeTruthy();
    }));

    it('should render choose playlist dropdown with 1 playlist name as "All Videos" ', () => {
      const app = fixture.debugElement.nativeElement;
      expect(app.querySelector('select .playlist-name').textContent).toEqual('All Videos');
      expect(component.playlist.length).toEqual(1);
    });

    it('should render 5 videos from playlist" ', () => {
      const app = fixture.debugElement.nativeElement;
      expect(app.querySelectorAll('.video-from-playlist').length).toEqual(5);
    });
  });

  describe('when playlist has been created', () => {
    it('should call addNewPlaylist() and call setPlaylist method of playListService', () => {
      const playList = {
        'name': 'New Playlist',
        'videos': require('../../../assets/stubs/videos.stub.json')
      };
      const service = TestBed.get(PlaylistService);
      spyOn(service, 'setPlayList').and.returnValue(null);
      component.addNewPlaylist(playList);
      expect(service.setPlayList).toHaveBeenCalled();
    });
  });
});
