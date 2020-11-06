

import { animate, keyframes, state, style, transition, trigger, group } from '@angular/animations';
import { Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px)'
      })),
      transition('normal <=> highlighted', animate(300)),
      // transition('highlighted => normal', animate(200))
    ]),

    trigger('wildState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0), scale(1)'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrunken', style({
        backgroundColor: 'green',
        transform: 'translateX(0px) scale(0.5)'
      })),
      transition('normal => highlighted', animate(500)),
      transition('highlighted => normal', animate(400)),
      transition('shrunken <=> *', [
        animate(500, keyframes([
          style({
              backgroundColor: 'orange',
              offset: 1
            })
        ]))
      ])
    ]),

    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-150px)'
        }),
        animate(300)]),
        transition('* => void', [
          animate(300, style({
        opacity: 1,
        transform: 'translateX(150px)'
      }))])
    ]),


    //best option new
    trigger('list2', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        animate(1000, keyframes([
          style({
            transform: 'translateX(-100px)',
            opacity: 0,
            offset: 0
          }),
          style({
            transform: 'translateX(-50px)',
            opacity: 0.5,
            offset: 0.3
          }),
          style({
            transform: 'translateX(0px)',
            opacity: 1,
            offset: 1
          })
        ]))
      ]),
        transition('* => void', [
          group([
            animate(300, style({
              color: 'red'
            })),
            animate(500, style({
              opacity: 1,
              transform: 'translateX(150px)'
            }))

          ])
    ])
    ])
  ]
})
export class AppComponent {
  state = 'normal'
  wildstate = 'normal'
  list = ['Milk', 'Sugar', 'Bread'];

    onAdd(item) {
      this.list.push(item);
    }

    onAnimate() {
      this.state == 'normal' ? this.state='highlighted' : this.state='normal';
      this.wildstate == 'normal' ?  this.wildstate='highlighted' : this.wildstate='normal';
    }

    onShrink() {
      this.wildstate = 'shrunken'
    }

    onDelete(item) {
      const newList = this.list.filter((val, id) => val!==item)
      this.list = newList
    }

    animationStarted(event) {
      console.log(event)
    }

    animationEnded(event) {
      console.log(event)
    }
}
