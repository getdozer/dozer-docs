# Authorization

Dozer offers the possibility to add an authorization layer to your data APIs in an efficient way. 
One of the ways Dozer provides authorization is through the use of JSON Web Tokens (JWT). JWT is a widely used industry-standard method for representing claims securely between two parties. 

Let's follow the step-by-step guide, and add safeguards to your application from unauthorized access, ensuring data integrity and user trust.

## 🔑 Add Authorization

The steps to follow to add the authorization in the data API are:

1. Generate and export a master token for auth:

```bash
dozer api generate-token
export MASTER_TOKEN=your_token_here
```

2. Start the Dozer app with the command:

```bash
dozer
```

3. Now, if you open the new terminal and change the directory to the server folder and install the required package dependencies:
```bash
cd server && yarn install
```

4. You can run a server application by writing the command:
```bash
node index.js
```
The server app will pass the auto-generated auth token with the master token to subsequent requests to the client app while communicating.

5. In a new terminal, navigate to the client directory, install client dependencies, and start the application:
```bash
cd ../client && yarn install && yarn start
```

6. To see the user side of your application, open a new tab in the browser and enter the URL:

`localhost:3000 `

7. To see the admin dashboard of your application, open a new tab in the browser and enter the URL:

`localhost:3000/admin/dashboard`

In the admin side of the application, you should enter the username and password as "admin", to see the real-time updates.

> __Note__: always ensure that your MASTER_TOKEN is kept secure. Do not commit this information to your version control system.

###### tags: `API` `Token`
