import {Component, EventEmitter, OnInit, Output, Input, OnDestroy} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators} from '@angular/forms';
import index from '@angular/cli/lib/cli';
import {PlaylistService} from '../../../shared/playlist.service';
import {PlaylistModel} from '../../../models/playlist.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.css']
})
export class CreatePlaylistComponent implements OnInit, OnDestroy {
  @Output() addPlaylist = new EventEmitter();
  allVideosFromPlayList: PlaylistModel;
  playlistForm: FormGroup;
  showPlaylistForm: boolean;
  subscription: Subscription;

  constructor(private formBuilder: FormBuilder, private playlistService: PlaylistService) {

  }

  /**
   * @description when component is initialised ngOnInit() gets called and it subscribes to playlistSubject
   * to get latest videos from playlist('All Videos')
   */
  ngOnInit() {
    this.subscription = this.playlistService.playlistSubject.subscribe((playlist) => {
      this.allVideosFromPlayList = [...playlist].filter(list => list.name === 'All Videos')[0];
      if (this.allVideosFromPlayList.name) {
        this.createForm();
      }
    });
  }

  /**
   * @description createForm() method creates form with dynamically added new control for each video checkbox
   */
  createForm(): void {
    const controls = [...this.allVideosFromPlayList['videos']].map(control => new FormControl(false));
    controls[0].setValue(true);
    this.playlistForm = this.formBuilder.group({
      playListName: new FormControl('playListName', [Validators.required]),
      videos: new FormArray(controls)
    });
  }

  /**
   * @description on click of Cancel in create-playlist form, resetPlayListForm() gets called and
   * which creates new form for removing any errors
   */
  resetPlayListForm(): void {
    this.createForm();
  }

  /**
   * @description createPlaylist() gets called when form is submitted without error on click of Submit button
   * and emits to parent with playlist details to add
   */
  createPlaylist(): void {
    const videosToAdd = [];
    const controlArray = this.playlistForm.controls['videos']['controls'];
    const videosToAddControls = [];

    controlArray.forEach((control, indexVal) => {
      if (control.value) {
        videosToAddControls.push(indexVal);
      }
    });
    this.addPlaylist.emit({
      name: this.playlistForm.controls['playListName'].value,
      videos: [...videosToAddControls].map(videoIndex => this.allVideosFromPlayList['videos'][videoIndex])
    });
    this.resetPlayListForm();
    this.showPlaylistForm = !this.showPlaylistForm;
  }

  /**
   * @description On component end subscription gets unsubscribed
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
