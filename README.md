# JSValli
The Drink of Fortune Wheel

## Game Logic
The Drink of fortune wheel randomizes actions for a group of peapole, actions
describe actions for everyone on the wheel.   Additional the wheel will 
randomly give a extra rule for one person on the wheel of for the whole group.


## Usage
I the webroot there is a [csv file](./play.csv), This file includes the actions
and the group of persons.  The "extra" in index 1 and 2 are the only values 
used for the additional random.  Index 1 will be displayed randomly every 25,
index 2 will be displayed every 10 spinn.
```csv
"index","rules","name","extra"
1,Ekkert,Valgeir,Allir Drekka
2,Gefðu 3 sopa,Vignir,Þú mátt ráða
3,Taktu 4 sopa,Bjartur,
4,Skiptu um drykk,Hinrik,
5,Kláraðu drykkinn,Gabríal,
6,Taktu 5 sopa,Stefán,
7,Gefðu 5 sopa,Bogi,
8,Taktu 2 sopa,Jónas,
9,Ræður næst,Kobbi,
```
If you do not have access to the webroot to update/edit the csv file you can
load a file from another site.   F.e. if you publish a spredsheet to the web 
from google spreedsheet.  In google File->Publish to web->"choose csv" and 
copy the url.  Add the example to the url path.
```
?csv=https://docs.google.com/spreadsheets/d/e/2PACX-1vQWmwDwuhvyrfvWJHQ7ZweLLewwykQ652aNwWEadZoztIh_vy7i1l-kdCILfq8oAnCLR2GU0Jv6bYe-/pub?output=csv
```

### Youtube howto share csv
[![Google Spreedsheets to csv](http://img.youtube.com/vi/nxWUdLwIaeQ/0.jpg)](https://www.youtube.com/watch?v=nxWUdLwIaeQ "Google Spreedsheet to csv")

## Demo site
[The Drink Fortune Wheel](https://hvar-er-valli.appspot.com)