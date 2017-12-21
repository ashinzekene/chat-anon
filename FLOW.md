- User creates a/c
- User can create a circle -> Becomes admin
- Admin can delete and edit group
- Admin can delete and accept circle invites
- Admin can make other fellows admin
- *Users can follow and be followed so circles can be suggested


- Only fellows of a circle can create a poll
- Votes have to vetted/voted as appropriate or not - can only be done once
- A poll becomes voteable if `35%` of fellows vote it as appropriate
- Only fellows can vote in a poll - only once

- A fellow can see all his polls
  - Has to be user formatted
    ```json
      hasVoted: boolean,
      hasMarkedAppropriate: boolean,
      starred: boolean,
      createdByMe: boolean
    ```
- A user can see all his circles
  - Has to be user formatted
    ```json
      admin: boolean
    ```

## SCHEMAS

### USER
- username
- email
- avatar
- first_name
- last_name
- admin_circles
- circles
- voted_polls
- starred_polls
- created_polls
- password

### CIRCLE
- name
- avatar
- slug/handle
- description
- fellows
- admins
- invitees
- polls

### POLLS
- question
- comment
- options
- appropriate
- inappropriate
- circle
- votes

## ROUTES

### USERS
/create
/view
/edit
/delete
/star_poll
/unstar_poll

### POLLS
/create
/view
/edit
/delete
/mark_app
/mark_inapp
/vote
/star
/unstar


### CIRCLES
/create
/add_admin
/remove_admin
/add_fellow
/remove_fellow
/add_invitee
/remove_invitee
/add_poll
/remove_poll