import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreatePlaylistComponent} from './create-playlist.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {of} from 'rxjs';
import {PlaylistService} from '../../../shared/playlist.service';

describe('CreatePlaylistComponent', () => {
  let component: CreatePlaylistComponent;
  let fixture: ComponentFixture<CreatePlaylistComponent>;

  const defaultPlayList = {
    name: 'All Videos',
    videos: require('../../../../assets/stubs/videos.stub.json')
  };
  const playListServiceStub = {
    playlistSubject: of([defaultPlayList])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePlaylistComponent],
      providers: [FormBuilder, {provide: PlaylistService, useValue: playListServiceStub}],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have button with text "Create Playlist"', () => {
    const app = fixture.debugElement.nativeElement;
    expect(app.querySelector('#create-playlist-button').textContent).toEqual('Create Playlist');
  });

  it('should have div with class"add-form-container" on click of create-playlist button', () => {
    const app = fixture.debugElement.nativeElement;
    app.querySelector('#create-playlist-button').click();
    fixture.detectChanges();
    expect(component.showPlaylistForm).toBe(true);
    expect(app.querySelector('div.add-form-container')).toBeTruthy();
  });

  it('should close div with class"add-form-container" on click of close-button', () => {
    const app = fixture.debugElement.nativeElement;
    app.querySelector('#create-playlist-button').click();
    fixture.detectChanges();
    app.querySelector('.close-button').click();
    fixture.detectChanges();
    expect(component.showPlaylistForm).toBe(false);
    expect(app.querySelector('div.add-form-container')).not.toBeTruthy();
  });

});
