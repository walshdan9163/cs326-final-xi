The Retro Tech Connection REST API
===================================

Authentication
--------------
```/login```<br/>
```/register```

Login will create a POST request submitting username and password - assuming the information submitted is valid - the user will be returned an authentication token.

Register must check that the username and email submitted are unique - should then store these values using a POST request, and return the user an authentication token (log them in).

CREATE API
----------
### Overview ###
POST requests that facilitate the creation or updating of objects.

### REST Calls ###
```POST /api/hardware``` 

Create a new piece of hardware.<br/>


```POST /api/software```

Create a new piece of software.<br/>

```POST /api/media``` 

Create a new piece of media.<br/>


```POST /api/tag```

Creates a new tag.<br/>


```POST /api/user/[id]/hardware```

Add hardware to user account.<br/>


```POST /api/user/[id]/software```

Add software to a user account.<br/>


```POST /api/user```

Create a new user.

READ API
--------
### Overview ###
GET requests that facilitate the viewing of information about objects. Specific GET requests for Media should not be needed because media will be retrieved with the associated hardware/software.

### REST Calls ###
```GET /api/user/[id]```

View a user account/profile.<br/>


```GET /api/hardware?sort=popular&page=2```

Gets list of hardware (paginated, can also be sorted for display on the front page).<br/>


```GET /api/software?sort=popular&page=1```

Gets list of software (paginated/sorted)<br/>


```GET /api/hardware/[id]```

Gets single piece of hardware.<br/>


```GET /api/software/[id]```

Gets a single piece of software.<br/>


```GET /api/tag/[name]```

View the results associated with a tag beings searched.

UPDATE API
-----------
### Overview ###
Update functionality can be achieved by a combination of DELETE and POST requests.

### Specific Note About Trades ###
You can facilitate a trade by calling (in the case of a hardware trade) the DELETE method on the trader's account id (for the specific piece of hardware) and the corresponding POST method on the recipient's account id.

DELETE API
-----------
### Overview ###
DELETE requests that facilitate the deletion of objects.

### REST Calls ###
```DELETE /api/user/[user:id]/hardware/[hardware:id]```

Delete a piece of hardware from a user account.<br/>


```DELETE /api/user/[user:id]/software/[software:id]```

Delete a piece of software from a user account.<br/>


```DELETE /api/media/[id]```

Delete media (should look for references and delete from that content).

HEROKU URL
-----------
https://retrotechconnection.herokuapp.com/#

DIVISION OF LABOR
-----------------
