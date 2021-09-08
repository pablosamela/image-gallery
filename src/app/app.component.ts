import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthenticateService } from './shared/services/authenticate.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, OnDestroy {
	title = 'image-gallery';

	constructor(private authenticateService: AuthenticateService) {}

	ngOnInit() {
		this.authenticateService.signIn().subscribe();
	}

	ngOnDestroy(){
		this.authenticateService.signOut();
	}
}
