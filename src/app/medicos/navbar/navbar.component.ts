import { Component, OnInit } from '@angular/core';
import {Medico} from "../model/medico";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onCancel(){
    this.router.navigate(['new'],{relativeTo: this.route})
  }
}
