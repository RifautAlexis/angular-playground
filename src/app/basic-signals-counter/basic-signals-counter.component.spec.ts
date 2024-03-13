import { BasicSignalsCounterComponent } from './basic-signals-counter.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

describe('BasicSignalsCounterComponent', () => {
  let component: BasicSignalsCounterComponent;
  let fixture: ComponentFixture<BasicSignalsCounterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BasicSignalsCounterComponent],
    });

    fixture = TestBed.createComponent(BasicSignalsCounterComponent);
    component = fixture.componentInstance;
  });

  describe('constructor', () => {
    it('should create instance', () => {
      expect(component).toBeDefined();
    });
  });

  describe('increment', () => {
    it('should update counter signal value to 1', () => {
      component.counter = signal<number>(0);

      component.increment();

      expect(component.counter()).toBe(1);
    });

    it('should update counter signal value to 2', () => {
      component.counter = signal<number>(1);

      component.increment();

      expect(component.counter()).toBe(2);
    });

    it('should update counter signal value to -1', () => {
      component.counter = signal<number>(-2);

      component.increment();

      expect(component.counter()).toBe(-1);
    });
  });

  describe('decrement', () => {
    it('should update counter signal value to -1', () => {
      component.counter = signal<number>(0);

      component.decrement();

      expect(component.counter()).toBe(-1);
    });

    it('should update counter signal value to 0', () => {
      component.counter = signal<number>(1);

      component.decrement();

      expect(component.counter()).toBe(0);
    });

    it('should update counter signal value to -3', () => {
      component.counter = signal<number>(-2);

      component.decrement();

      expect(component.counter()).toBe(-3);
    });
  });

  describe('setValue', () => {
    it('should set counter signal value to -1', () => {
      component.counter = signal<number>(0);

      component.setValue({
        target: {
          value: 5,
        },
      });

      expect(component.counter()).toBe(5);
    });

    it('should set counter signal value to 0', () => {
      component.counter = signal<number>(1);

      component.setValue({
        target: {
          value: 0,
        },
      });

      expect(component.counter()).toBe(0);
    });

    it('should set counter signal value to -3', () => {
      component.counter = signal<number>(-2);

      component.setValue({
        target: {
          value: -5,
        },
      });

      expect(component.counter()).toBe(-5);
    });
  });
});
