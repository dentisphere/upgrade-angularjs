import { OnInit, Component } from '@angular/core';

@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html',
})
export class NavigationComponent implements OnInit {
    private companyName: string;

    ngOnInit(): void {
        this.companyName = 'Awesome, Inc.';
    }
}
