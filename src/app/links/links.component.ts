import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {Link} from "./LinkObject";

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {

  links: Link[] = [
//    uncomment if sample links needed
//    {name: 'Google', url: 'https://www.google.com'},
//    {name: 'YouTube', url: 'https://www.youtube.com'},
//    {name: 'Reddit', url: 'https://www.reddit.com'},
//    {name: 'GitHub', url: 'https://www.github.com'}
  ]

  opened: boolean = false;
  hoverIndex: number = -1;
  editing: boolean = false;
  currentLink: Link = {name: '', url: ''};

  ngOnInit(): void {
    this.opened = JSON.parse(localStorage.getItem('opened') || 'false');
    this.links = JSON.parse(localStorage.getItem('links') || '[]');
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.links, event.previousIndex, event.currentIndex);
    localStorage.setItem('links', JSON.stringify(this.links));
  }

  delete(index: number) {
    this.links.splice(index, 1);
    localStorage.setItem('links', JSON.stringify(this.links));
  }

  open() {
    this.opened = true;
    localStorage.setItem('opened', JSON.stringify(this.opened));
  }

  close() {
    this.opened = false;
    localStorage.setItem('opened', JSON.stringify(this.opened));
  }


  getIcon(url: string): string {
    return "https://s2.googleusercontent.com/s2/favicons?domain_url=" + url;
  }

  openLink(link: Link, $event: MouseEvent) {
    if ($event.which == 3) return;
    if ($event.ctrlKey) {
      window.open(link.url, '_blank');
    } else if ($event.which == 2) {
      window.open(link.url, '_blank');
    } else {
      window.open(link.url, '_self');
    }
  }

  newLink() {
    this.currentLink = {name: '', url: ''};
    this.editing = true;
  }

  edit(link: Link) {
    this.currentLink = link;
    this.editing = true;
  }

  save() {
    this.editing = false;
    this.links.push(this.currentLink);
    localStorage.setItem('links', JSON.stringify(this.links));
  }

  back() {
    this.editing = false;
    this.links = JSON.parse(localStorage.getItem('links') || '[]');
  }
}
