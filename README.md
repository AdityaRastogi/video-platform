# AppVideoPlatform

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Component Structure
->AppComponent 
-->VideoPlayerComponent
---->PlaylistComponent
----->AddVideoComponent
----->CreatePlaylistComponent

## App Design
Video-Platform has been designed by using CSS-grid for giving app a responsive behavior of all platforms.

## App Features
->App is loaded with set of videos by default using which playlist can be created or if a user wants to add new video, 
which can be done by click action on 'ADD Video to playlist' button. Similarly user can create playlist by click action 
on 'Create Playlist' Button which allows to add specific videos in <new>playlist which multi Select checkbox feature.

->Once video starts playing and in between another playlist has been selected then video under playmode will continue 
and once ended then first video from selected playlist will start playing.

-> Once all videos played in playlist then it starts playing from 1st video of that playlist. 
