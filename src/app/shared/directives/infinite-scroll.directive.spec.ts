import { Component, signal } from "@angular/core";
import { InfiniteScrollDirective } from "./infinite-scroll.directive";
import { ComponentFixture, TestBed } from "@angular/core/testing";

@Component({
    imports: [InfiniteScrollDirective],
    template: `
        <div appInfiniteScroll (scrolled)="count = count + 1">
            {{ content() }}
        </div>
    `
})
class HostComponent {
    readonly content = signal('');
    count = 0;
}

describe('InfiniteScrollDirective', () => {
    let fixture: ComponentFixture<HostComponent>;
    let component: HostComponent;

    beforeEach(() => {
        fixture = TestBed.createComponent(HostComponent);
        component = fixture.componentInstance;
    });

    function setHostRect(bottom: number, height = bottom): void {
        const el: HTMLElement = fixture.nativeElement.firstElementChild;
        vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({ bottom, height } as DOMRect);
    }

    const scroll = () => window.dispatchEvent(new Event('scroll'));

    it ('emit after the first render when the component does not fill the screen', () => {
        setHostRect(0);
        fixture.detectChanges();
        expect(component.count).toBe(1);
    });

    it('emits again when new content still does not fill the screen', () => {
        setHostRect(0);
        fixture.detectChanges();

        setHostRect(300);
        component.content.set('more');
        fixture.detectChanges();
        expect(component.count).toBe(2);
    });

    it('emits on scroll only when near the bottom of the host', () => {
        setHostRect(5000);
        fixture.detectChanges();
        scroll();

        expect(component.count).toBe(0);

        setHostRect(window.innerHeight + 100, 5000);
        scroll();
        expect(component.count).toBe(1);
    });

    it('stops listening when destroyed', () => {
        setHostRect(5000);

        fixture.detectChanges();
        fixture.destroy();

        setHostRect(0);
        scroll();
        expect(component.count).toBe(0);
    })
});