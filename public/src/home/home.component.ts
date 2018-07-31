import { OnInit, Component } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    private title: string;

    ngOnInit(): void {
        this.title = 'Awesome, Inc. Internal Ordering System';
    }
}
