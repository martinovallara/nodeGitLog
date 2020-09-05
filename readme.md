# List of Card Ids

Utility to generate the Id list of cards present in the commit Messages from a given date.

usage:
    node index.js \<path-of-git-repo\> PH 2020-01-01"
    
for extract card Id in commit message after '2020-01-01' with message which contains 'PH' from git repo in \<path-of-git-repo\>

will return:
```
1903,1907,1946,1959,1977,1978,1980,1984,1986,1991,1992,1995,1997,1998,2002,2009,2014,2036,2038,2046

Copy a past the list in filter box of trello to see the complete list of cards.

```