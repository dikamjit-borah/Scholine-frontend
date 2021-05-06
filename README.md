# Scholine-frontend
Frontend of the Scholine Plus application

To handle routing, netlify probably uses a server which does not understand the internal routing infrastructure of a SPA like react. Hence, gives a 404 error on refresh or redirect (url changes) to solve this we need to explicitly configure the files like .toml file for netlify or procfile for Heroku.  



[[redirects]]
  from = "/*"
  to = "/"
  status = 200
