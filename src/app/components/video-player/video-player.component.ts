import {Component, OnInit, ElementRef, Renderer2, ViewChild, OnDestroy} from '@angular/core';
import {PlaylistService} from '../../shared/playlist.service';
import {Subscription} from 'rxjs';
import {VideoDetailsModel} from '../../models/video-details.model';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('videoPlayer') videoplayer: ElementRef;

  public videos = [];
  public playListVideos = [];
  public videosCount: number = -1;
  public videoUrl: string;
  public videoArtist: string;
  public videoTitle: string;
  public playListName: string;
  public subscription: Subscription;

  constructor(private renderer: Renderer2, private playListService: PlaylistService) {

  }


  ngOnInit() {
    this.subscription = this.playListService.playlistSubject
      .subscribe((playListArray) => {
        this.videos = playListArray;
        if (this.videos.length > 0) {
          this.playListVideos = this.playListName ? [...this.videos].filter(playlist => playlist.name === this.playListName) :
            [...this.videos].filter(playlist => playlist.name === 'All Videos');
          this.setSpecificVideoToPlay();
        }
      });
    this.onVideoEnd();
  }

  /**
   * @description setNextVideoToPlay() gets called when video is ended to play next and also, it restarts from the beginning once
   * last video is ended
   */
  setNextVideoToPlay(): void {
    if (this.videosCount < this.playListVideos[0]['videos'].length) {
      this.videosCount++;
    }
    if (this.videosCount === this.playListVideos[0]['videos'].length) {
      this.videosCount = 0;
    }
    const video = this.playListVideos[0]['videos'][this.videosCount];
    this.videoUrl = video['url'];
    this.videoArtist = video['artist'];
    this.videoTitle = video['title'];
  }

  /**
   * @description setSpecificVideoToPlay() gets the videos from playlist and updates videosCount and
   * calls setNextVideoToPlay()
   */
  setSpecificVideoToPlay(): void {
    if (this.playListVideos[0]['videos'] && this.playListVideos[0]['videos'].length > 0) {
      this.videosCount = this.playListVideos[0]['videos'].length;
      this.setNextVideoToPlay();
    }
  }

  /**
   * @description setVideosToPlay() accepts playListName and filters out videos on playListName
   * @param <string> playListName
   */
  setVideosToPlay(playListName: string) {
    this.playListName = playListName;
    this.playListVideos = [...this.videos].filter(playlist => playlist.name === this.playListName);
    this.videosCount = -1;
  }

  /**
   * @description playSelectedPlaylist() gets called once user selects playlist to play and,
   * calls setVideosToPlay which accepts playlist to set videos from
   * @param <playList>
   */
  playSelectedPlaylist(playListName) {
    this.setVideosToPlay(playListName);
  }

  /**
   * @description playSelectedVideoFromPlaylist() gets called when user selects video from playlist and accepts video object
   * of TYPE videoDetailsModel
   * @param <VideoDetailsModel> video
   */
  playSelectedVideoFromPlaylist(video: VideoDetailsModel) {
    [...this.playListVideos[0]['videos']].forEach((videoFromPlaylist, indexVal) => {
      if (videoFromPlaylist.title === video.title) {
        this.videosCount = indexVal;
      }
    });
    this.videoplayer.nativeElement.src = video.url;
    this.videoUrl = video['url'];
    this.videoArtist = video['artist'];
    this.videoTitle = video['title'];
    this.videoplayer.nativeElement.play();
  }

  /**
   * @description onVideoEnd() gets called once component is initialised through ngOnInit() and registers 'ended' event
   * with videoPlayer and calls setNextVideoToPlay() to play next video
   */
  onVideoEnd(): void {
    this.renderer.listen(this.videoplayer.nativeElement, 'ended', () => {
      this.setNextVideoToPlay();
      this.videoplayer.nativeElement.src = this.videoUrl;
      this.videoplayer.nativeElement.play();
    });
  }

  /**
   * @description On component end subscription gets unsubscribed
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
