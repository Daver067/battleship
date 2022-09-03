# battleship

The final product is available to view (and play) at: https://daver067.github.io/battleship/

This battleship app is intended to be written following TDD. I will be writing unit tests first, and then writing code to pass those tests.
All of the game logic will be written prior to implementing any kind of user interface.

I will be using webpack, and integrating jest into webpack.

Had an issue changing jest from using require to using standard ECMA import export.
Followed instructions on the following stack overflow question to resolve this issue.
https://stackoverflow.com/questions/35756479/does-jest-support-es6-import-export

I did not do any mocking of tests for the Dom Rendering as that has not been taught yet. I put myself through a bit of confusion using
xAxis and Yaxis interchangably for a while and had to re-work the code halfway through to fix it. I think if I would have used a separate class or 
constructor that made a co-ordinate object, and used that as a argument instead of separate x axis and y axis arguments it would have been much cleaner.

I did not aim for a very esthetic css on this project, went more bare bones, but still attempted to properly align things and centre them.

I'm proud of my planning steps in this project and found it significantly easier to code when I had modules laid out in paper. TDD was very nice for refactoring code, as I knew instantly what broke when I made a change.
