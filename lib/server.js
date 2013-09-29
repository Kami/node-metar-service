/*
 *  Copyright 2013 Tomaz Muraus
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

var async = require('async');
var express = require('express');
var rateLimiter = require('rate-limiter');
var underscore = require('underscore');
var parseMETAR = require('metar');
var log = require('logmagic').local('metar-service.server');

var RATE_LIMIT_RULES = [
  ['/metar', 'all', 1000, 86400, true],
];

function Server(config) {
  this._config = config;

  this._app = express();
}

Server.prototype.run = function(callback) {
  async.series([
    this._initialize.bind(this),
    this._listen.bind(this),
  ],

  function(err) {
    if (err) {
      throw err;
    }

    if (callback) {
      callback();
    }
  });
};

Server.prototype._initialize = function(callback) {
  this._app.use(express.bodyParser());
  this._app.use(rateLimiter.expressMiddleware(RATE_LIMIT_RULES));
  this._app.post('/metar', this._handleMetarRequest.bind(this));
  callback();
};

Server.prototype._listen = function(callback) {
  var port = this._config.port, hostname = this._config.hostname;
  this._app.listen(port, hostname, callback);
  log.infof('Server listening on ${hostname}:${port}',
            {'port': port, 'hostname': hostname});
};

Server.prototype._handleRateLimitReached = function(req, res, limit, ipLimitData) {
};

Server.prototype._parseMetarValues = function(values) {
  var i, value, item, parsed, result;

  result = [];

  for (i = 0; i < values.length; i++) {
    value = values[i];
    parsed = parseMETAR(value);
    item = {'metar': value, 'parsed': parsed};
    result.push(item);
  }

  return result;
};

Server.prototype._sendError = function(res, msg, code) {
  var data = {'error': msg};
  this._sendResponse(res, data, code);
};

Server.prototype._sendResponse = function(res, data, code) {
  code = code || 200;
  data = JSON.stringify(data, null, 4);
  res.send(data, code);
};

Server.prototype._handleMetarRequest = function(req, res) {
  var payload = req.body, value, isArray, parsed, result;

  if (!payload || !payload.value) {
    this._sendError(res, 'Missing "value" key', 400);
    return;
  }

  value = payload.value;
  isArray = underscore.isArray(value);

  if (!underscore.isString(value) && !isArray) {
    this._sendError(res, '"value" must either be string or an array', 400);
    return;
  }

  if (!isArray) {
    value = [value];
  }

  try {
    parsed = this._parseMetarValues(value);
  }
  catch (err) {
    this._sendError(res, 'Invalid METAR string provided', 400);
    return;
  }

  if (isArray) {
    result = {'result': parsed};
  }
  else {
    result = {'result': parsed[0]};
  }

  // TODO: Cache same values
  this._sendResponse(res, result, 200);
};

exports.Server = Server;
