import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { demos } from '../../../../demo-snippets/ng/install.module';

@Component({
    selector: 'ns-menu',
    templateUrl: './menu.component.html'
})

export class MenuComponent implements OnInit {
    demos = demos;
    constructor(private router: RouterExtensions) {}

    ngOnInit(): void {
        if (demoRedirect) {
            const Demo = demos.find(({ path }) => path === demoRedirect);
            if (Demo) {
                this.router.navigate([Demo.path]);
            }
        }
    }

    goToDemo(component: string): void {
        this.router.navigate([component], {
            animated: true,
            transition: {
                name: 'slideLeft',
                duration: 200,
                curve: 'ease'
            }
        });
    }
}
