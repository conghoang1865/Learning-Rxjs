import { fromEvent, interval, merge, Observable } from 'rxjs';
import { buffer, map, mapTo, pluck, reduce } from 'rxjs/operators';

interface User {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
}

const source = new Observable<User>((observer) => {
  const users = [
    {
      id: 'ddfe3653-1569-4f2f-b57f-bf9bae542662',
      username: 'tiepphan',
      firstname: 'tiep',
      lastname: 'phan',
    },
    {
      id: '34784716-019b-4868-86cd-02287e49c2d3',
      username: 'nartc',
      firstname: 'chau',
      lastname: 'tran',
    },
  ];

  setTimeout(() => {
    observer.next(users[0]);
  }, 1000);
  setTimeout(() => {
    observer.next(users[1]);
    observer.complete();
  }, 3000);
});

const users$ = new Observable<User>((observer) => {
  const users = [
    {
      id: 'ddfe3653-1569-4f2f-b57f-bf9bae542662',
      username: 'tiepphan',
      firstname: 'tiep',
      lastname: 'phan',
      postCount: 5,
    },
    {
      id: '34784716-019b-4868-86cd-02287e49c2d3',
      username: 'nartc',
      firstname: 'chau',
      lastname: 'tran',
      postCount: 22,
    },
  ];

  setTimeout(() => {
    observer.next(users[0]);
  }, 1000);
  setTimeout(() => {
    observer.next(users[1]);
    observer.complete();
  }, 3000);
});

const observer = {
  next: (value) => console.log(value),
  error: (err) => console.error(err),
  complete: () => console.log('completed'),
};
// source.subscribe(observer);

source.pipe(
  map((user) => {
    return {
      ...user,
      fullname: `${user.firstname} ${user.lastname}`,
    };
  })
);
// .subscribe(observer);

source.pipe(map((user) => user.id));
// .subscribe(observer);

source.pipe(pluck('id')).subscribe(observer);

//pluck code from chatGPT
const inputField = document.getElementById('inputField');

// Tạo Observable từ sự kiện 'input' trên trường input và trích xuất giá trị
const inputObservable = fromEvent(inputField, 'input').pipe(
  pluck('target', 'value')
);

inputObservable.subscribe((value) => console.log(value));

//mapTO
// const element = document.querySelector('#hover');

// const mouseover$ = fromEvent(element, 'mouseover');
// const mouseleave$ = fromEvent(element, 'mouseleave');

// const hover$ = merge(
//   mouseover$.pipe(mapTo(true)),
//   mouseleave$.pipe(mapTo(false))
// );

// hover$.subscribe(observer);

//reduce

users$.pipe(reduce((acc, curr) => acc + curr.postCount, 0)).subscribe(observer);

//buffer
const interval$ = interval(1000);

const click$ = fromEvent(document, 'click');

const buffer$ = interval$.pipe(buffer(click$));

const subscribe = buffer$.subscribe((val) =>
  console.log('Buffered Values: ', val)
);
