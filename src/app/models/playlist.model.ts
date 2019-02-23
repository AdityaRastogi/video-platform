import {VideoDetailsModel} from './video-details.model';

/**
 * Mapper for  Playlist with array videos
 */
export interface PlaylistModel {
  name: string;
  videos: [VideoDetailsModel];
}
