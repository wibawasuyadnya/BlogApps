## SSR BLOG APP WITH NEXT.JS, STRAPI, GRAPHQL, MYSQL

## DEVELOPMENT STATUS
Under Development 

## BACKEND 
**blogapi**  
cd and npm install then start npm run develop inside blogapi dir  
visit http://localhost:1337 / http://127.0.0.1:1337  
  
> importance notes : make sure you set up your own server & database config. my configuration in this project is using MYSQL inside of docker  
> docker uses notes : before connecting your strapi to mysql make sure to alter user to use mysql native password on user that connected through strapi database.js  

## FRONTEND  
**blog-frontend**   

***DEVELOPMENT MODE***
cd and npm install then start npm run dev inside blog-frontend dir  
visit http://localhost:3000  

***PRODUCTION MODE***
cd and npm install after that start npm run build then npm start inside blog-frontend dir  
visit http://localhost:3000  
