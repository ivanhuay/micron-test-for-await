# Micron Benchmark For await vs await
This is a benchmark to analize the performance between the two functions `for + await` vs `for-await`.

## Motivation
In this benchmark we measure the performance variation using this two funcions:

```javascript
for (var i = 0; i < limit; i++) {
  let elm = await getResource();
}
```
vs
```javascript
data = {
  [Symbol.asyncIterator]() {
    return {
      i: 0,
      next() {
        if (this.i < limit) {
          this.i++;
          return getResource()
              .then((value)=>({value, done: false}));
        }
        return Promise.resolve({ done: true });
      }
    };
  }
};
for await (let prom of data) {
}
```

`for await` looks simpler but you have to use an `AsyncIterator` that isn't simpler than using an array.

## Results

Both functions have similar performance but `for await` has more complexity because of the AsyncIterator. Only if we were using an async iterator previously the `for next` is better than a simple `for + await`.

[view results HERE](https://ivanhuay.github.io/micron-test-for-await/)
![Alt image](https://github.com/ivanhuay/micron-test-for-await/blob/master/img/img.jpg?raw=true)

## run the test

```
git clone https://github.com/ivanhuay/micron-test-for-await.git

cd micron-test-for-await

npm i

npm run test
```

after running that the results should be on the docs folder.
