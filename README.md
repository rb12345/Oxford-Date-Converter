Oxford Date Converter library
=============================

Written by Robert Bradley (robert.bradley@merton.oxon.org) on 30/12/2005.  Updated 20/3/2006.
Copyright (c) R. A. Bradley 30/12/2005.

This library makes it possible to convert Oxford dates to real dates and vice versa.  It creates
a new OxfordDate object to represent Oxford dates, and adds a .toOxfordDate() method to new Date objects.

OxfordDate objects have the following properties and methods:

* `Term`:  Term object reprsenting the term
* `Week`:	Week in the term
* `Day`:	Day of the week (0=Sunday, 6=Saturday)
* `toRealDate()`:	Return the real date represented by the object

function Term(realDate)
-----------------------

This is the constructor for the Term object.  The Term object has the following properties:

* `term.StartDate` (Date object)
* `term.TermName` (string)

Example:

```javascript
term=new Term(new Date());
alert(term.TermName+" term "+term.StartDate.getYear()+" starts on "+term.StartDate.toString());
```

function CreateTerm(year, termNumber)
-------------------------------------

termNumber:

*	0=Hilary
*	1=Trinity
*	2=Long Vacation
*	3=Michaelmas

This function returns a Term object for the term and year specified.

Example:

```javascript
term=CreateTerm(2006, 3);
alert("Michaelmas 2006 starts on "+term.StartDate.toString());
```

function OxfordDate(term, week, day)
------------------------------------

Create a new OxfordDate object.  The term argument must be created using the CreateTerm function, or by
passing in an existing OxfordDate's Term property.

Examples:

```javascript
oxDate=new OxfordDate(CreateTerm(2006, 0), 1, 0);// Sunday 1st week, Hilary 2006
today=(new Date()).toOxfordDate(); // Get today as an OxfordDate
oxDate2=new OxfordDate(today.Term, 5, 6);// Saturday 5th week of this current term
```