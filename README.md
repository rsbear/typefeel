# [typefeel.com](https://typefeel.com)

typefeel.com is a web application for keyboard enthusiasts to share and get involved in projects. This repo is repo contains the API as well as the web application.

### The stack
* PostgreSQL 
* API -- Apollo server, [TypeGraphQL](https://typegraphql.ml/docs/introduction.html), [TypeORM](https://typeorm.io/#/)
* Web application -- React / [NextJS](https://nextjs.org/docs/getting-started)

Prerequisites: Docker

## Get the project
In terminal
```
git clone https://github.com/rsbear/typefeel.git
cd typefeel-master
```

## Start the API

### Create the database using [Docker](https://www.docker.com/)
In terminal (make sure you're in typefeel-master)
```
cd api
docker-compose up -d
```

By default, the server will connect to your local database. If for some reason you want to change the connection properties, you can do so in ``docker-compose.yml`` and ``/api/src/index.ts``

Once the database is up. In terminal make sure you're in `/api` directory:
```
yarn && yarn install
yarn dev
```
A connection string will show up in your terminal `http://localhost:4000/graphql`

## Start the web app
In terminal navigate with typefeel-master as your root
```
cd webapp
yarn && yarn install && yarn dev
```

### To generate new useQuery or useMutation hook
Codegen introspects the GraphQL schema of the API. In order to generate the query or mutation
for the frontend it must first exist in the schema. So once you have created the query or mutation on type-api, you're ready to generate it for the frontend.

Make a new .graphql file
```
cd graphql
touch newMutation.graphql
```
please note newMutation is just a substitute; please name your file accordingly
Here is an examples of how `newMutation.graphql` might look
```graphql
mutation NewMutation($input: NewDataInput) {
  newMutation(input: $input) {
    success
    message
  }
}
```
Then run ```yarn generate```, and it will create a custom hook in 
- /generated
  - graphql.tsx

### Using the new query or mutation hook
Open whichever component or page you want the hook and implement it.
Example of your newMutation

```javascript
  const [newMutation] = useNewMutationMutation({ variables: { input: { fake: "", fake2: "" } }})

  const handleMutation = () => {
    event.preventDefault()
    try {
      const response = await newMutation()
      // then do something with the response
      console.log(response)
    } catch (err) {
      // fail gracefully
    }
  }
```


## Run it
```yarn install && yarn dev```