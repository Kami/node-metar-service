# Metar REST service

Simple REST service for translating METAR weather reports.

# Usage

## Starting a server

```bash
bin/server [--port=<listen port>] [--hostname=<listen hostname>]
```

## Sending requests

### Single METAR report

```bash
curl -X POST -H "Content-Type: application/json" http://127.0.0.1:8888/metar -d '{"value": "metar string"}'
```

For example:

```bash
curl -X POST -H "Content-Type: application/json" http://127.0.0.1:8888/metar -d '{"value": "MMMX 252043Z 00000KT 6SM SCT020TCU OVC080 21/11 A3014 NOSIG RMK SLP056 57024 909 8/26/ HZY DSNT CB SW"}'
```

### Multiple METAR reports

```bash
curl -X POST -H "Content-Type: application/json" http://127.0.0.1:8888/metar -d '{"value": ["metar string1", "metar string 2"]}'
```

For example:

```bash
curl -X POST -H "Content-Type: application/json" http://127.0.0.1:8888/metar -d '{"value": ["MMMX 252043Z 00000KT 6SM SCT020TCU OVC080 21/11 A3014 NOSIG RMK SLP056 57024 909 8/26/ HZY DSNT CB SW", "MMMC 251948Z 26003KT 6SM SCT020TCU BKN080 OVC200 21/11 A3017 NOSIG RMK 8/267 HZY BINOVC"]}'
```

# TODO

* Cache responses

# License

Library is distributed under the [Apache license](http://www.apache.org/licenses/LICENSE-2.0.html).
