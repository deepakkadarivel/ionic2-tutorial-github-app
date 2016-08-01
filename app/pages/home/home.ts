import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {GitHubService} from '../../services/github.ts';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [GitHubService]
})
export class HomePage {
  public foundRepos;
  public username;

  constructor(private github: GitHubService) {}

  getRepos() {
    this.github.getRepos(this.username).subscribe(
      data => {
        this.foundRepos = data.json();
      },
      err => console.error(),
      () => console.log('getRepos Complete')
    );
  }
}