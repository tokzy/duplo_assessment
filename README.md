## PROJECT BREAKDOWN
===========================================
1. Registration endpoint for business
2. login endpoint that works for the business and its departments(ROLE BASED)
3. endpoint for business to create accounts for its departments
4. Endpoints to place orders: 
i. Background Queue implemented to tackle the slow response of the government api and to still ensure the speed of orders are not reduced on duplo
ii. Background Queue implemented to log transaction orders into mongodb 
iii. Db Transaction implemented to take care of concurrent orders
5. endpoints to get the credit score 
6. API endpoint for each business to fetch the order details (total number of orders, total amount of orders, total number of orders today, total amount of orders today)

### SWAGGER DOCUMENTATION
===============================================
to access the swagger documentation and view the endpoints
visit: http://localhost:${app_Port}/api 
app_port : for the port set on the app

### APPLICATION 
===============================================
To run the application

1. run ``Docker-compose up``  to run the database images and redis

2. run ``npm install`` on new terminal to download the node dependencies

3. run ``npm start:dev`` to start up the application
