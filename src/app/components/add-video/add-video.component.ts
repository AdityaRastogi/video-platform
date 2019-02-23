import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {PlaylistService} from '../../shared/playlist.service';
import {VideoDetailsModel} from '../../models/video-details.model';
import {Subscription} from 'rxjs';
import {PlaylistModel} from '../../models/playlist.model';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.css']
})
export class AddVideoComponent implements OnInit, OnDestroy {
  playlist: PlaylistModel[] = [];
  showAddVideoForm: boolean;
  addVideoForm: FormGroup;
  subscription: Subscription;


  constructor(private formBuilder: FormBuilder, private playlistService: PlaylistService) {
    this.createAddVideoForm();
  }

  createAddVideoForm(): void {
    this.addVideoForm = this.formBuilder.group({
      videoTitle: new FormControl('Title', [Validators.required]),
      videoArtist: new FormControl('Artist', [Validators.required]),
      videoUrl: new FormControl('Url', [Validators.required]),
      playlist: new FormControl('All Videos', [Validators.required])
    });
  }

  ngOnInit() {
    this.subscription = this.playlistService.playlistSubject.subscribe(playListArray => {
      this.playlist = playListArray;
    });
  }

  /**
   * @description resetForm methods updates form values with initial values :
   * VideoTitle as 'Title',VideoArtist as 'Artist',VideoUrl as 'URL' and playlist by default as 'All Videos'
   * and gets called once cancel or submit button is clicked
   */
  resetForm(): void {
    this.addVideoForm.controls['videoTitle'].setValue('Title');
    this.addVideoForm.controls['videoArtist'].setValue('Artist');
    this.addVideoForm.controls['videoUrl'].setValue('URL');
    this.addVideoForm.controls['playlist'].setValue('All Videos');
  }

  /**
   * @description addVideoToPlaylistAndAllVideos() adds the videos selected to 'All Videos' and Playlist Selected
   * @param <string> playList
   * @param <VideoDetailsModel> video
   */
  addVideoToPlaylistAndAllVideos(playList: string, video: VideoDetailsModel): void {
    const playlistSelected = [...this.playlist].filter((list) => list.name === playList);
    playlistSelected[0]['videos'].push(video);
    this.playlist = this.playlist.map((list) => list.name === playList ? playlistSelected[0] : list);
  }

  /**
   * @description addvideoToLibrary() gets called when form has been submitted on click of submit button
   * this method updates video Object of Type VideoDetailsModel with the user entered values and calls
   * addVideoToPlaylistAndAllVideos() with playlist name and video object and updates playlist by calling
   * setPlaylist() method of playlist service with new Playlist array
   */
  addvideoToLibrary(): void {
    let video: VideoDetailsModel;
    const playListSelectedName = this.addVideoForm.controls['playlist'].value;
    video = {
      title: this.addVideoForm.controls['videoTitle'].value,
      artist: this.addVideoForm.controls['videoArtist'].value,
      url: this.addVideoForm.controls['videoUrl'].value
    };
    this.addVideoToPlaylistAndAllVideos(playListSelectedName, video);
    if (playListSelectedName !== 'All Videos') {
      this.addVideoToPlaylistAndAllVideos('All Videos', video);
    }
    this.playlistService.setPlayList(this.playlist);
    this.resetForm();
    this.showAddVideoForm = !this.showAddVideoForm;
  }

  /**
   * @description On component end subscription gets unsubscribed
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
