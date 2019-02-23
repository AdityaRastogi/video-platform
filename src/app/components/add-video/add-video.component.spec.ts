import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddVideoComponent} from './add-video.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {of} from 'rxjs';
import {PlaylistService} from '../../shared/playlist.service';

describe('AddVideoComponent', () => {
  let component: AddVideoComponent;
  let fixture: ComponentFixture<AddVideoComponent>;
  const defaultPlayList = {
    name: 'All Videos',
    videos: require('../../../assets/stubs/videos.stub.json')
  };
  const playListServiceStub = {
    playlistSubject: of([defaultPlayList]),
    setPlayList: () => ({})
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddVideoComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [FormBuilder, {provide: PlaylistService, useValue: playListServiceStub}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe('when component is initialised', () => {
    it('should have add-video-button and not add-form-container', () => {
      const app = fixture.debugElement.nativeElement;
      expect(app.querySelector('.add-video-button')).toBeTruthy();
      expect(app.querySelector('add-form-container')).not.toBeTruthy();
    });

    it('should have add-form-container and contain submit and close button, when add-video-button is clicked', () => {
      const app = fixture.debugElement.nativeElement;
      app.querySelector('.add-video-button').click();
      fixture.detectChanges();
      expect(app.querySelector('.add-form-container')).toBeTruthy();
      expect(app.querySelector('.submit-video-button')).toBeTruthy();
      expect(app.querySelector('.close-button')).toBeTruthy();
    });

    it('should not have add-form-container, when close-button is clicked', () => {
      const app = fixture.debugElement.nativeElement;
      app.querySelector('.add-video-button').click();
      fixture.detectChanges();
      app.querySelector('.close-button').click();
      fixture.detectChanges();
      expect(app.querySelector('.add-form-container')).not.toBeTruthy();
    });
    describe('when', () => {
      it('should call addVideoToPlaylistAndAllVideos() and' +
        'update playlist with video details entered, when addVideoToLibrary gets called', () => {
        component.addVideoForm.patchValue({
          videoTitle: 'Rummy',
          videoArtist: 'Circle',
          videoUrl: 'http://mirrors.standaloneinstaller.com/video-sample/dolbycanyon.m4v',
          playlist: 'All Videos'
        });
        component.addvideoToLibrary();
        const videoAddedInPlaylist = component.playlist[0]['videos'].filter((video) => video.title === 'Rummy');
        expect(videoAddedInPlaylist[0].url).toEqual('http://mirrors.standaloneinstaller.com/video-sample/dolbycanyon.m4v');
        expect(videoAddedInPlaylist[0].artist).toEqual('Circle');
      });
    });
  });
});
