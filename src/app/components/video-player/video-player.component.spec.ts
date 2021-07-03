import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VideoPlayerComponent} from './video-player.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {PlaylistService} from '../../shared/playlist.service';
import {of} from 'rxjs';

const defaultPlayList = {
  name: 'All Videos',
  videos: require('../../../assets/stubs/videos.stub.json')
};
const playListServiceStub = {
  playlistSubject: of([defaultPlayList])
};

describe('VideoPlayerComponent', () => {
  let component: VideoPlayerComponent;
  let fixture: ComponentFixture<VideoPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VideoPlayerComponent],
      providers: [{provide: PlaylistService, useValue: playListServiceStub}],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have video-playlist-container class as parent', () => {
    const app = fixture.debugElement.nativeElement;
    expect(app.querySelector('div').className).toEqual('video-playlist-container');
  });

  it('should have div with class video-container inside video-playlist-container div', () => {
    const app = fixture.debugElement.nativeElement;
    expect(app.querySelector('div.video-playlist-container div').className).toEqual('video-container');
  });


  it('should have video tag inside video-container div', () => {
    const app = fixture.debugElement.nativeElement;
    app.querySelector('div.video-container video').src = 'http://techslides.com/demos/sample-videos/small.mp4';
    expect(app.querySelector('div.video-container video')).toBeTruthy();
  });

  describe('when component is initialized', () => {
    it('should call setSpecificVideoToPlay() and set playListVideos', () => {
      expect(component.playListVideos[0]['videos'].length).toEqual(7);
    });
    it('should call setNextVideoToPlay() and update videoCount as 0 and update video details such as URL,artist and title', () => {
      expect(component.videosCount).toEqual(0);
      expect(component.videoUrl).toEqual('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4');
      expect(component.videoArtist).toEqual('Elephant');
      expect(component.videoTitle).toEqual('Elephant Dream');
    });
  });

  describe('when playlist has selected', () => {
    it('should call setVideosToPlay() with selected playlist and updates video count as -1', () => {
      component.setVideosToPlay('All Videos');
      expect(component.videosCount).toEqual(-1);
    });

    it('should call setVideosToPlay() with wrong playlist name and playListVideos array should be empty', () => {
      component.setVideosToPlay('No Videos');
      expect(component.playListVideos.length).toEqual(0);
    });
  });

  describe('when video from playlist has selected', () => {
    it('should call playSelectedVideoFromPlaylist() with video Object and updates videoCount with index of that video in playlist as well as video details', () => {
      const video = {
        'title': 'Big Buck Bunny',
        'artist': 'Bunny',
        'url': 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      };
      component.playSelectedVideoFromPlaylist(video);
      expect(component.videosCount).toEqual(3);
      expect(component.videoTitle).toEqual('Big Buck Bunny');
      expect(component.videoArtist).toEqual('Bunny');
      expect(component.videoUrl).toEqual(video.url);
    });

    it('should call setVideosToPlay() with wrong playlist name and playListVideos array should be empty', () => {
      component.setVideosToPlay('No Videos');
      expect(component.playListVideos.length).toEqual(0);
    });
  });
});
