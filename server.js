import mysql from 'mysql';
import config from './config.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post('/api/loadUserSettings', (req, res) => {
    let connection = mysql.createConnection(config);
    let userID = req.body.userID;

    let sql = `SELECT mode FROM user WHERE userID = ?`;
    let data = [userID];

    connection.query(sql, data, (error, results) => {
        if (error) {
            return console.error(error.message);
        }
        res.send({ express: JSON.stringify(results) });
    });
    connection.end();
});

// Get movies
app.post('/api/getMovies', (req, res) => {
    let connection = mysql.createConnection(config);

    let sql = `SELECT * FROM movies`;

    connection.query(sql, (error, results) => {
        if (error) {
            return console.error(error.message);
        }
        res.send(results);
    });
    connection.end();
});

// Add review
app.post('/api/addReview', (req, res) => {
    let connection = mysql.createConnection(config);

    const { userID, movieID, reviewTitle, reviewContent, reviewScore } = req.body;

    let sql = 'INSERT INTO Review (userID, movieID, reviewTitle, reviewContent, reviewScore) VALUES (?, ?, ?, ?, ?)';
    let data = [userID, movieID, reviewTitle, reviewContent, reviewScore];

    connection.query(sql, data, (error) => {
        if (error) {
            console.error('Error adding review:', error);
            res.status(500).send('Error adding review');
            return;
        }
        res.status(200).send('Review added successfully');
    });
    connection.end();
});

// Search movies
app.post('/api/searchMovies', (req, res) => {
    const { title, actor, director } = req.body;
    const connection = mysql.createConnection(config);

    let sqlQuery = `SELECT 
                        name, 
                        GROUP_CONCAT(DISTINCT CONCAT(directors.first_name, ' ', directors.last_name) SEPARATOR ', ') AS directors,
                        IFNULL(AVG(Review.reviewScore), 'N/A') AS averageScore,
                        GROUP_CONCAT(DISTINCT reviewContent SEPARATOR ', ') AS reviews
                    FROM 
                        movies
                    LEFT JOIN 
                        movies_directors ON movies.id = movies_directors.movie_id
                    LEFT JOIN 
                        directors ON movies_directors.director_id = directors.id
                    LEFT JOIN 
                        Review ON movies.id = Review.movieID
                    LEFT JOIN 
                        roles ON movies.id = roles.movie_id
                    LEFT JOIN 
                        actors ON roles.actor_id = actors.id
                    WHERE 
                        1=1`;

    const queryParams = [];
    if (title) {
        sqlQuery += ` AND movies.name = ?`;
        queryParams.push(title);
    }

    if (actor) {
        sqlQuery += ` AND CONCAT(actors.first_name, ' ', actors.last_name) = ?`;
        queryParams.push(actor);
    }

    if (director) {
        sqlQuery += ` AND CONCAT(directors.first_name, ' ', directors.last_name) = ?`;
        queryParams.push(director);
    }

    sqlQuery += ` GROUP BY name;`;

    connection.query(sqlQuery, queryParams, (error, results) => {
        if (error) {
            console.error("SQL Error: ", error);
            return res.status(500).send(error);
        }
        res.send(results);
    });
});

// Create a new watchlist
app.post('/api/createWatchlist', (req, res) => {
    let connection = mysql.createConnection(config);

    const { userID, name } = req.body;

    let sql = 'INSERT INTO Watchlists (userID, name) VALUES (?, ?)';
    let data = [userID, name];

    connection.query(sql, data, (error, results) => {
        if (error) {
            console.error('Error creating watchlist:', error);
            res.status(500).send('Error creating watchlist');
            return;
        }

        const watchlistID = results.insertId;
        res.status(200).send({ watchlistID, name });
    });
    connection.end();
});

// Add a movie to a watchlist
app.post('/api/addMovieToWatchlist', (req, res) => {
    let connection = mysql.createConnection(config);

    const { watchlistID, movieID } = req.body;

    let sql = 'INSERT INTO WatchlistMovies (watchlistID, movieID) VALUES (?, ?)';
    let data = [watchlistID, movieID];

    connection.query(sql, data, (error) => {
        if (error) {
            console.error('Error adding movie to watchlist:', error);
            res.status(500).send('Error adding movie to watchlist');
            return;
        }
        res.status(200).send('Movie added to watchlist successfully');
    });
    connection.end();
});

// Get details of a specific watchlist (movies and comments)
app.post('/api/getWatchlistDetails', (req, res) => {
    let connection = mysql.createConnection(config);

    const { watchlistID } = req.body;

    let sql = `
        SELECT 
            m.id AS movieID, 
            m.name AS movieName, 
            GROUP_CONCAT(DISTINCT CONCAT(directors.first_name, ' ', directors.last_name) SEPARATOR ', ') AS directors,
            IFNULL(AVG(Review.reviewScore), 'N/A') AS averageScore,
            GROUP_CONCAT(DISTINCT reviewContent SEPARATOR ', ') AS reviews
        FROM 
            WatchlistMovies wm
        JOIN 
            movies m ON wm.movieID = m.id
        LEFT JOIN 
            movies_directors ON m.id = movies_directors.movie_id
        LEFT JOIN 
            directors ON movies_directors.director_id = directors.id
        LEFT JOIN 
            Review ON m.id = Review.movieID
        WHERE 
            wm.watchlistID = ?
        GROUP BY 
            m.id, m.name;
        
        SELECT 
            wc.commentID, wc.comment, u.firstName, u.lastName
        FROM 
            WatchlistComments wc
        JOIN 
            User u ON wc.userID = u.userID
        WHERE 
            wc.watchlistID = ?;
    `;

    let data = [watchlistID, watchlistID];

    connection.query(sql, data, (error, results) => {
        if (error) {
            console.error('Error fetching watchlist details:', error);
            res.status(500).send('Error fetching watchlist details');
            return;
        }

        const movies = results[0];  
        const comments = results[1];  

        res.status(200).send({ movies, comments });
    });
    connection.end();
});

// Get all watchlists
app.post('/api/getAllWatchlists', (req, res) => {
    let connection = mysql.createConnection(config);

    let sql = `
        SELECT 
            w.watchlistID, 
            w.name AS watchlistName,
            GROUP_CONCAT(m.id ORDER BY m.name ASC SEPARATOR ', ') AS movieIDs,
            GROUP_CONCAT(m.name ORDER BY m.name ASC SEPARATOR ', ') AS movieNames
        FROM 
            Watchlists w
        LEFT JOIN 
            WatchlistMovies wm ON w.watchlistID = wm.watchlistID
        LEFT JOIN 
            movies m ON wm.movieID = m.id
        GROUP BY 
            w.watchlistID, w.name
    `;

    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Error fetching all watchlists:', error);
            res.status(500).send('Error fetching all watchlists');
            return;
        }

        
        const formattedResults = results.map(watchlist => ({
            watchlistID: watchlist.watchlistID,
            name: watchlist.watchlistName,
            movies: watchlist.movieIDs ? watchlist.movieIDs.split(', ') : [] 
        }));

        res.status(200).send(formattedResults);
    });
    connection.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`));
