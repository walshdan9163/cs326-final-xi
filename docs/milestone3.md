Database Description
--------------------
```
hardware:
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| id           | int       | ID of the hardware       |
| name         | string    | The name of the hardware |
| description  | string    | Description of hardware  |
```
```
software:
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| id           | int       | ID of the software       |
| name         | string    | The name of the software |
| description  | string    | Description of software  |
```
```
users:
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| id           | int       | ID of the user           |
| email        | string    | The email of the user    |
| password     | string    | User's password          |
```
```
media:
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| id           | int       | ID of the media          |
| name         | string    | The name of the media    |
| URL          | string    | Source of the media      |
```
```
tag:
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| id           | int       | ID of the tag            |
| name         | string    | The name of the tag      |
```
```
trade:
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| id           | int       | ID of the trade          |
| ownerId      | int       | ID of the trade owner    |
| recipId      | int       | ID of trade recipient    |
| techId       | int       | ID of the tech traded    |
| accept       | boolean   | Trade accepted?          |
```
```
userOwnership:
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| userId       | int       | ID of the tech owner     |
| techId       | int       | ID of the owned tech     |
| techType     | string    | Type of tech owned       |
```
```
mediaRelation:
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| mediaId      | int       | ID of the media          |
| techId       | int       | ID of the related tech   |
| techType     | string    | Type of tech related     |
```
```
tagRelation:
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| tagId        | int       | ID of the tag            |
| techId       | int       | ID of the related tech   |
| techType     | string    | Type of tech related     |
```
```
authentication:
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| userId       | int       | ID of the user           |
| token        | string    | Auth token for the user  |
| exp          | time      | Expiration of token      |
```
Division of Labor
------------------

### Will Hammond ###

### Dan Walsh ###

### Jackson Weber ###
Setup `pg-promise` in the project.</br>
Connected database.</br>
Configured Hardware entities/methods to use the database.</br>
Drafted original DB schema.
