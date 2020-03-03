# typefeel.com

typefeel.com is a web application for keyboard enthusiasts to share and get involved in projects.
This repo is only the client and is built with React/NextJS, Apollo GraphQL, and Emotion.js

Prerequisites: [https://github.com/rsbear/type-api](https://github.com/rsbear/type-api)
You will need to have the back end up and running in order to start development for the client.

## Start

In terminal
```
git clone https://github.com/rsbear/typefeel.git
cd typefeel-master
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
