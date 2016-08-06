# Chainstory

Please review the [PRD](https://docs.google.com/document/d/16fkjJkY-aUkDOxmOzfRGl2GatT6ntgmithlVUFxKaHs/edit?usp=sharing) first to understand the background and vision.

## Folder structures

| Folder  | Usage  |  
|---|---|
| web  | for all frontend files  |
| server  | for all backgend files  |
| web/static  | frontend production complied files  |
| web/index.html  | frontend home page |
| web/src  | frontend source files |
| web/components  | frontend vue components, includes component **html** and **js** also **less** |
| web/views  | frontend vue views files |
| web/main.js  | frontend vue entry, where the frontend begins |
| server/app.go  | where server begins |
| server/controllers  | just controllers |
| server/models  | just models |
| server/routes  | just routes |
| server/utils  | just utils |


## Frontend

Make sure you already done the command below

```
cd web
npm install
```

To start the frontend dev server

```
npm run dev
```


## Backend

To Start the API Server

```
cd server
go run app.go
```

If you want to serve the latest web, run this command in `web` folder to compile the latest frontend.

```
npm run build
```
