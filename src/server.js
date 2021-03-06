import express from "express";
import React from "react";
import _ from "lodash";
import http from "http";
import serverMiddleware from "pawjs/src/server/middleware";
import serverHooks from "pawjs/src/server/hooks";
import Config from "./config";
import * as appReducers from "./app/reducers";

const app = express();
/**
 * --- Your custom code START ---
 */
app.use((req, res, next) => {
  res.locals.reduxInitialState = {
    counter: {
      count: 5
    }
  };
  res.locals.reduxReducers = appReducers;
  // res.locals.reduxEnhancers = [enhancer1, enhancer2];
  // res.locals.reduxMiddlewares = [middleware1, middleware2];
  
  next();
});


/**
 * --- Your custom code END ---
 */
// Add the core server as middleware
app.use(serverHooks);

app.use((req, res, next) => {
  res.locals.wook.add_filter("paw_head", head => {
    return head;
  });
  next();
});

app.use(serverMiddleware);

const server = http.createServer(app);
const serverPort = process.env.PORT || _.get(Config, "server.port", 3000);

server.listen(serverPort, "0.0.0.0", function(err) {
  if (err) throw err;
  const addr = server.address();
  // eslint-disable-next-line
  console.log("Listening at http://%s:%d", addr.address, addr.port);
});

export default app;