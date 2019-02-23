import {Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {PlaylistModel} from '../../models/playlist.model';
import {PlaylistService} from '../../shared/playlist.service';
import {VideoDetailsModel} from '../../models/video-details.model';

declare var require: any;

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  @Output() playThisPlaylist = new EventEmitter();
  @Output() playSelectedVideo = new EventEmitter();
  @ViewChild('playListSelect') playListSelect: ElementRef;
  public choosenPlaylist: PlaylistModel[] = [];
  public playlist: PlaylistModel[] = [];
  public defaultPlayList: PlaylistModel;

  constructor(private playListService: PlaylistService, private renderer: Renderer2) {
    this.defaultPlayList = {
      name: 'All Videos',
      videos: require('../../../assets/stubs/videos.stub.json')
    };
    this.playlist.push(this.defaultPlayList);
  }

  /**
   * @description ngOnInit() gets called when component is initialised and
   * choosePlaylist after filtering from main Playlist and registers change event on select dropdown
   */
  ngOnInit() {
    this.choosenPlaylist = [...this.playlist].filter(playlist => playlist.name === 'All Videos');
    this.playListService.setPlayList(this.playlist);
    this.renderer.listen(this.playListSelect.nativeElement, 'change', () => {
      this.choosenPlaylist = [...this.playlist].filter(playlist => playlist.name === this.playListSelect.nativeElement.value);
      this.playSelectedPlaylist(this.playListSelect.nativeElement.value);
    });
  }

  /**
   * @description addNewPlaylist() gets call when new playlist from create-playlist-component has submitted and
   * updates playList by calling setPlaylist() of playListService
   * @param <data>
   */
  addNewPlaylist(data): void {
    this.playlist.push(data);
    this.choosenPlaylist = [...this.playlist].filter(playlist => playlist.name === 'All Videos');
    this.playListService.setPlayList(this.playlist);
  }

  /**
   * @description playSelectedPlaylist() gets call when new playList has been selected and
   * emit to parent(video-player-component) with listName
   * @param <string> listName
   */
  playSelectedPlaylist(listName: string): void {
    this.playThisPlaylist.emit(listName);
  }

  /**
   * @description playVideoFromPlaylist() gets call when user click on video in the playlist and
   * emits to parent(video-player-component)
   * @param <VideoDetailsModel> video
   */
  playVideoFromPlaylist(video: VideoDetailsModel): void {
    this.playSelectedVideo.emit(video);
  }
}
