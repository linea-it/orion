# DES Portal Dashboard

This App is LIneA's Science Portal Dashboard

---

## Installation

**1. Clone the repository and create .env**

```bash
git clone https://github.com/linea-it/polaris.git
cd polaris
cp .env.template .env
```

**2. Configuring the Centaurus API**

Modify `REACT_APP_API_URL key` in `.env` to a valid Centaurus API url <a href="https://github.com/linea-it/centaurus.git" target="_blank">(see Centaurus API).</a>

**3. Running** 

- If you're going to run in a development environment, use:
```bash
yarn install
yarn start
```
> Running at URL: http://localhost:3000

- Or by docker using docker-compose:
> Modify `REACT_APP_API_URL` key in `docker-compose.yml` to a valid Centaurus API url <a href="https://github.com/linea-it/centaurus.git" target="_blank">(see Centaurus API).</a>
```bash
cp docker-compose.yml.template docker-compose.yml
docker-compose up
```
> Running at URL: http://localhost/monitor

---

## Release History

* v1.0.0
   * INIT: First version
