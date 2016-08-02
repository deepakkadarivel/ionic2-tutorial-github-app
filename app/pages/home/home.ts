import {Component} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';
import {GitHubService} from '../../services/github.ts';
import {DetailsPage} from '../details/details'

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [GitHubService]
})
export class HomePage {
  public foundRepos;
  public username;

  constructor(private github: GitHubService, private nav: NavController) { }

  getRepos() {
    this.github.getRepos(this.username).subscribe(
      data => {
        this.foundRepos = data.json();
      },
      err => console.error(),
      () => console.log('getRepos Complete')
    );
  }

  gotoDetails(repo) {
    let profileModal = Modal.create(DetailsPage, { repo: repo });
    profileModal.onDismiss(data => {
      console.log(data);
    });
    this.nav.present(profileModal);
    // this.nav.push(DetailsPage, {repo: repo});
  }
}
