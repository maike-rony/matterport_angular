import { Component, OnDestroy, OnInit } from '@angular/core';
import { TagId } from '../models/TagId';
import { MatterportSDKWrapperService } from '../services/matterport-sdk-wrapper.service';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { MatterportModelService } from '../services/matterport-model.service';

@Component({
    selector: 'app-matterport-view',
    templateUrl: './matterport-view.component.html',
    styleUrls: ['./matterport-view.component.scss'],
})
export class MatterportViewComponent implements OnInit, OnDestroy {
    modelUrl!: Observable<string>;
    selectedTagId?: TagId;
    hoveredTagId?: TagId;
    private onDestroy$ = new Subject();

    constructor(
        private matterportSdk: MatterportSDKWrapperService,
        private matterportModel: MatterportModelService
    ) {}

    async ngOnInit(): Promise<void> {
        this.modelUrl = this.matterportModel.getViewUrl();
    }

    async onFrameInit(iframe: HTMLIFrameElement): Promise<void> {
        await this.matterportSdk.initialize(iframe);
        this.matterportSdk
            .listenClickEvent()
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((id) => {
                this.selectedTagId = id;
            });
        this.matterportSdk
            .listenHoverEvent()
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(({ id, hovering }) => {
                this.hoveredTagId = hovering ? id : undefined;
            });
    }

    ngOnDestroy(): void {
        this.onDestroy$.next();
    }
}
