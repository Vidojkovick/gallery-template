import { afterEveryRender, Directive, ElementRef, HostListener, inject, output } from "@angular/core";

const LOAD_THRESHOLD = 400

@Directive({ selector: '[appInfiniteScroll]' })
export class InfiniteScrollDirective {
    readonly scrolled = output<void>();

    private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
    private lastHeight?: number;

    constructor() {
        afterEveryRender(() => {
            const height = this.host.nativeElement.getBoundingClientRect().height;

            if (height !== this.lastHeight) {
                this.lastHeight = height;
                this.check();
            }
        })
    }

    @HostListener('window:scroll')
    @HostListener('window:resize')
    protected check(): void {
        const distanceToBottom = this.host.nativeElement.getBoundingClientRect().bottom - window.innerHeight;

        if (distanceToBottom < LOAD_THRESHOLD) {
            this.scrolled.emit();
        }
    }
}