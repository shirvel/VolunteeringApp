import initApp from "./app";
import http from 'http';


initApp().then((app) => {
    const port = process.env.PORT
    app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    })
});