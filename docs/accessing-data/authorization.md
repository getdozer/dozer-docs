# Authorization

Dozer offers the possibility to add an authorization layer to your data APIs in an efficient way. 
One of the ways Dozer provides authorization is through the use of JSON Web Tokens (JWT). JWT is a widely used industry-standard method for representing claims securely between two parties. 

Let's follow the step-by-step guide, and add safeguards to your application from unauthorized access, ensuring data integrity and user trust.

## 🔑 Add Authorization

The steps to follow to add the authorization in the data API are:

Generate and export a master token for auth:

```bash
dozer security generate-token
```
In the console you will get an info with the generated token. Copy the token and paste it in a system variable, named MASTER_TOKEN, by writing in terminal this command:

```bash
export MASTER_TOKEN=your_token_here
```

Once you have saved the token, you can add an authorization in the request header of the API. For example, this command:

```bash
curl --location --request GET --header 'Authorization: Bearer MASTER_TOKEN' 'localhost:8080/trips'
```


> __Note__: always ensure that your MASTER_TOKEN is kept secure. Do not commit this information to your version control system.

###### tags: `API` `Token`
