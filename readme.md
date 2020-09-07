# List of Card Ids from git repository

Utility to generate the Id list of cards present in the commit Messages from a given date.

Assumption:

The card ID must be present in the commit message in this form: ```[ID]: ex [1321] ```

*a series of numeric characters enclosed in square brackets*


usage (after git clone):
    node index.js \<path-of-git-repo\> PH 2020-01-01"
    
for extract card Id in commit message after '2020-01-01' with message which contains 'PH' from git repo in \<path-of-git-repo\>

will return:
```
Founded 20 cardId.

1903,1907,1946,1959,1977,1978,1980,1984,1986,1991,1992,1995,1997,1998,2002,2009,2014,2036,2038,2046

Copy a past the list in filter box of trello to see the complete list of cards.


===== LIST OF COMMIT WITH CONTAINS 'MIN'  ================ 


MIN PH[2014] update the IP ....
MIN [2017] avoid calling the underlying ....
MIN [2016] introduce an invalidAttempt ....
MIN [2017] add a constraint on empty ...
MIN [2016] avoid calling ... 
...
...


```