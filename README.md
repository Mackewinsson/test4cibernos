## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

THis is the simplest solution i came up with in a shot period of time.

It adds games to the ongoing board.
You can edit the scores or finish the game.
When you finish the game it will go to the sumary list.
The sumary list is ordered by the total score of the games.
In order to reduce rerenders i added some hooks like useCallback to make a better performance.
Of course with more time this can be improve a lot and i am more than happy to defend my aproach or how can this be improved.
