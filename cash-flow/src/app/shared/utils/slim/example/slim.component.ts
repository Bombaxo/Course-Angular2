import { Component, OnInit } from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-slim',
  templateUrl: './slim.component.html',
  styleUrls: ['./slim.component.css']
})
export class SlimComponent implements OnInit {

  constructor( private slimLoader: SlimLoadingBarService ) { }

  ngOnInit() {
  }

  setProgres30() {
        this.slimLoader.progress = 30;
    }

    startProgress() {
        // We can listen when loading will be completed
        this.slimLoader.start(() => {
            console.log('Loading complete');
        });
    }

    completeProgress() {
        this.slimLoader.complete();
    }

    stopProgress() {
        this.slimLoader.stop();
    }

    resetProgress() {
        this.slimLoader.reset();
    }

    incrementProgress() {
        this.slimLoader.progress++;
    }

    changeProgressTo4px() {
        this.slimLoader.height = '4px';
    }

    changeProgressTo2px() {
        this.slimLoader.height = '2px';
    }

    changeProgressToBlue() {
        this.slimLoader.color = 'blue';
    }

    changeProgressToFirebrick() {
        this.slimLoader.color = 'firebrick';
    }

}
