The Retro Tech Connection REST API
===================================

Authentication
--------------
/login<br/>
/register

Login will create a POST request submitting username and password - assuming the information submitted is valid - the user will be returned an authentication token.

Register must check that the username and email submitted are unique - should then store these values using a POST request, and return the user an authentication token (log them in).

CREATE
------
POST /hardware - Create a new piece of hardware.<br/>
POST /software - Create a new piece of software.<br/>
POST /media - Create a new piece of media.<br/>
POST /user/[id]/hardware - Add hardware to user account.<br/>
POST /user/[id]/software - Add software to a user account.

READ
-----
GET /user/[id] - View a user account/profile.<br/>
GET /hardware?sort=popular&page=2 - Gets list of hardware (paginated, can also be sorted for display on the front page).<br/>
GET /hardware/[id] - Gets single piece of hardware.<br/>
GET /tag/[name] - view the results associated with a tag beings searched.

UPDATE
------
You can facilitate a trade by calling (in the case of a hardware trade) the DELETE method on the trader's account id (for the specific piece of hardware) and the corresponding POST method on the recipient's account id.

DELETE
------
DELETE /user/[user:id]/hardware/[hardware:id] - Delete a piece of hardware from a user account.<br/>
DELETE /user/[user:id]/software/[software:id] - Delete a piece of software from a user account.<br/>
DELETE /media/[id] - Delete media (should look for references and delete from that content).
