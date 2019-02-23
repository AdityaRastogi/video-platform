import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  public playlistSubject = new BehaviorSubject(<any>[]);

  constructor() {
  }
  /**
   * setPlaylist method updates playListSubject after every update in playlist
   * @param playList is array of Type PlaylistModel
   */
  setPlayList(playList) {
    this.playlistSubject.next(playList);
  }
}
