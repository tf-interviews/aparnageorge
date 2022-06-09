# aparnageorge
# Note Management Application
## Steps for running the application:
1. Clone the repository.
   
   `git clone <repo-URL>`
2. Navigate to the root folder of the project `cd aparnageorge` on command line/terminal and run `npm install` to install all the dependencies.
3. Once the installation of dependencies are complete, run `npm run app` on command line/terminal to run the project.
4. Alternatively, to execute the test cases, run `npm test`. 

## Features and how to use these APIs:
To invoke the API via terminal please run using `curl` or use tools like Postman.

For a react application developer to invoke these APIs, use the following sample format:
```
fetch('<URL>', {
            method: 'METHOD',
            body: JSON.stringify({
                parameter1: 'value1',
                parameter2: 'value2'
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }}).then(response => {
                return response.json()
            }) 
```
`URL` and `METHOD` has to be replaced according to the feature specifications. Arguments for GET calls are passed as URL parameters, hence no body is required. Replace `localhost` by server IP address if running on a server.
### Features:
The features available in the application are listed below:
1. View active(not archived) notes of a user: <br/>
   URL: `http://localhost:8082/api/notes/:author` <br/>
where `:author` must be replaced by the unique user ID of the author of the note <br/>
METHOD: GET <br/>
eg: `http://localhost:8082/api/notes/apgeorge`

1. View archived notes of a user: <br/>
URL: `http://localhost:8082/api/notes/archived/:author` <br/>
where `:author` must be replaced by the unique user ID of the author of the note <br/>
METHOD: GET <br/>
eg: `http://localhost:8082/api/notes/archived/apgeorge`

1. Lookup a note based on note ID: <br/>
URL: `http://localhost:8082/api/notes/id/:id` <br/>
where `:id` must be replaced by the Mongo generated unique ObjectID of the note <br/>
METHOD: GET <br/>
eg: `http://localhost:8082/api/notes/id/62a17ba27caba1266c3b8a8e`

4. Save a new note: <br/>
URL: `http://localhost:8082/api/notes/` <br/>
METHOD: POST <br/>
eg: `http://localhost:8082/api/notes/` <br/>
``` 
Sample Body:
{
    "title":"Test note here",
    "author":"apgeorge",
    "description": "This is a test note specific to this module",
    "tags":["tagtest"],
    "archived": false
} 
```


5. Update existing note: <br/>
URL: `http://localhost:8082/api/notes/update/:id` <br/>
where `:id` must be replaced by the Mongo generated unique ObjectID of the note to be updated <br/>
METHOD: PUT <br/>
eg: `http://localhost:8082/api/notes/update/62a17ba27caba1266c3b8a8e` <br/>
```
Sample Body:
{
    "description": "This is an edited note"
}
```

6. Archive a single note: <br/>
URL: `http://localhost:8082/api/notes/archive/:id` <br/>
where `:id` must be replaced by the Mongo generated unique ObjectID of the note to be archived <br/>
METHOD: PUT <br/>
eg: `http://localhost:8082/api/notes/archive/62a17ba27caba1266c3b8a8e` <br/>
No Body required


7. Archive multiple notes at once: <br/>
URL: `http://localhost:8082/api/notes/multiarchive` <br/>
METHOD: PUT <br/>
eg: `http://localhost:8082/api/notes/multiarchive` <br/>
```
Sample Body:
{
    "ids":["629ed045a34446538e34389f","629ed04ba34446538e3438a1"]
}
```
where `ids` is an array of the Mongo generated unique ObjectIDs of the notes to be archived


8. Unrchive an archived note: <br/>
URL: `http://localhost:8082/api/notes/unarchive/:id` <br/>
where `:id` must be replaced by the Mongo generated unique ObjectID of the note to be unarchived <br/>
METHOD: PUT <br/>
eg: `http://localhost:8082/api/notes/unarchive/62a17ba27caba1266c3b8a8e` <br/>
No Body required

9. Unarchive multiple notes at once: <br/>
URL: `http://localhost:8082/api/notes/multiunarchive` <br/>
METHOD: PUT <br/>
eg: `http://localhost:8082/api/notes/multiunarchive` <br/>
```
Sample Body:
{
"ids":["629ed045a34446538e34389f","629ed04ba34446538e3438a1"]
}
```
where `ids` is an array of the Mongo generated unique ObjectIDs of the notes to be unarchived

10.  Delete a note with a specific note ID: <br/>
URL: `http://localhost:8082/api/notes/:id` <br/>
where `:id` must be replaced by the Mongo generated unique ObjectID of the note to be deleted <br/>
METHOD: DELETE <br/>
eg: `http://localhost:8082/api/notes/629ed045a34446538e34389f`

11. View active notes based on tag: <br/>
URL: `http://localhost:8082/api/notes/tags/:author/:tag` <br/>
where `:author` must be replaced by the unique user ID of the user and `:tag` must be replaced by the tags of interest <br/>
METHOD: GET <br/>
eg: `http://localhost:8082/api/notes/apgeorge/demo`

12. Delete active notes based on tag: <br/>
URL: `http://localhost:8082/api/notes/tags/:author/:tag` <br/>
where `:author` must be replaced by the unique user ID of the user and `:tag` must be replaced by the tags of interest <br/>
METHOD: DELETE <br/>
eg: `http://localhost:8082/api/notes/apgeorge/demo`

13. Get all notes across all users <br/>
URL: `http://localhost:8082/api/admin` <br/>
METHOD: GET <br/>
eg: `http://localhost:8082/api/admin`

14. Get all archived notes across all users <br/>
URL: `http://localhost:8082/api/admin/archived` <br/>
METHOD: GET <br/>
eg: `http://localhost:8082/api/admin/archived`

15. Get all active notes across all users <br/>
URL: `http://localhost:8082/api/admin/active` <br/>
METHOD: GET <br/>
eg: `http://localhost:8082/api/admin/active`

16. Get details of all users <br/>
URL: `http://localhost:8082/api/admin/users` <br/>
METHOD: GET <br/>
eg: `http://localhost:8082/api/admin/users`

17. Save a new user <br/>
URL: `http://localhost:8082/api/admin` <br/>
METHOD: POST <br/>
eg: `http://localhost:8082/api/admin` <br/>
``` 
Sample Body:
{
    "name":"Allison Wheeler",
    "userid":"awheeler",
    "bio":"Shine bright",
    "admin": false
}
```

18. Delete a user with a specific user ID <br/>
    URL: `http://localhost:8082/api/admin/users/:userid` <br/>
    where `:userid` must be replaced by the unique user ID of the user <br/>
METHOD: POST <br/>
eg: `http://localhost:8082/api/admin/users/:apgeorge` <br/>




## Choice of technology:
On the basis of popularity and community support, Python and Javascript were the two server side languages initially considered for implementation. 

**Reasons for selecting Javascript**
1. Better suited to JSON API based applications especially due to its support for asynchronous, non-blocking execution.
2. Faster runtime compared to Python.
3. Previous experience in building MEAN stack applications.
   
Since MERN stack is currently more popular for Web Application development, the project was built using 
- MongoDB (Unstructured/Semi-structured format, ease of use, availability of Cloud Atlas which increases ease of sharing)
- Express.js (Faster, highly compatible with Node.js, Simplicity)
- Node.js (asynchronous, non-blocking execution)

Mocha, Chai, ChaiHttp were used for developing the test-suite.



## Enhancements possible if time permits:
- Unit tests - using MongodbMemoryServer or sinon sandbox. Currently only integration test cases are included.
- Remote Procedure Calls - Google Protobuf could be used to avoid intense data transformations which adds to faster response and support multimedia with ease.
- Design document and architecture details are not provided with this readme currently.
- Express.js - Currently not maintained. Hence would be better to shift to a different framework with Nodejs support.
- Support for other note types:
  - images
  - soundtracks
  - to-do lists (completed/not)
  - Embedded/multi-level notes
