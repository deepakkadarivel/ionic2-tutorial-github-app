import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {GitHubService} from '../../services/github';

/*
  Generated class for the DetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/details/details.html',
  providers: [GitHubService]
})
export class DetailsPage {
  public readme = '';
  public repo;

  constructor(private nav: NavController, private github: GitHubService, private navParams: NavParams, private viewController: ViewController) {
    this.repo = navParams.get('repo');

    this.github.getDetails(this.repo).subscribe(
      data => {
        this.readme = data.text();
      },
      err => {
        if (err.status == 404) {
          this.readme = 'This repo does not have a Readme. :(';
        } else {
          console.error(err);
        }
      },
      () => console.log("getDetails Completed")
    );
  }

  dismiss() {
    this.viewController.dismiss();
  }

}
