/*
Oxford Date Converter library
=============================

Written by Robert Bradley (robert.bradley@merton.ox.ac.uk) on 30/12/2005.  Updated 20/3/2006.
Copyright © R. A. Bradley 30/12/2005.



This library makes it possible to convert Oxford dates to real dates and vice versa.  It creates
a new OxfordDate object to represent Oxford dates, and adds a .toOxfordDate() method to new Date objects.

OxfordDate objects have the following properties and methods:

Term:	Term object reprsenting the term
Week:	Week in the term
Day:	Day of the week (0=Sunday, 6=Saturday)
toRealDate():	Return the real date represented by the object
*/

var weekdays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

/*
function Term(realDate);

This is the constructor for the Term object.  The Term object has the following properties:

term.StartDate (Date object)
term.TermName (string)

Example:

term=new Term(new Date());
alert(term.TermName+" term "+term.StartDate.getYear()+" starts on "+term.StartDate.toString());
*/

function Term(realDate) {
var month=realDate.getMonth();
var year=realDate.getFullYear();

termBase=new Date(Date.UTC(year,8,30));
this.TermName="Michaelmas";

if (month<9) {
 this.TermName="Long Vacation";
 var termBase=new Date(Date.UTC(year,3,11));
 termBase.setDate(termBase.getDate()+70);
}

if (month<6) {
 termBase=new Date(Date.UTC(year,3,11));
 this.TermName="Trinity";
}

if (month<3) {
 termBase=new Date(Date.UTC(year,0,6));
 this.TermName="Hilary";
}
termBase.setDate(termBase.getDate()+(7-termBase.getDay())%7);
// termBase=Sunday 0th

this.StartDate=termBase;
}

/*
function Term(year,termNumber);

termNumber:
	0=Hilary
	1=Trinity
	2=Long Vacation
	3=Michaelmas

This function returns a Term object for the term and year specified.

Example:

term=CreateTerm(2006,3);
alert("Michaelmas 2006 starts on "+term.StartDate.toString());
*/

function CreateTerm(year,termNumber) {
var date;
year=parseInt(year);
termNumber=parseInt(termNumber);
switch(termNumber) {
 case 0: date=new Date(Date.UTC(year,0,1));break;
 case 1: date=new Date(Date.UTC(year,3,1));break;
 case 2: date=new Date(Date.UTC(year,6,1));break;
 case 3: date=new Date(Date.UTC(year,9,1));break;
}
return new Term(date);
}

/*
function OxfordDate(term,week,day);

Create a new OxfordDate object.  The term argument must be created using the CreateTerm function, or by
passing in an existing OxfordDate's Term property.

Examples:

oxDate=new OxfordDate(CreateTerm(2006,0),1,0);// Sunday 1st week, Hilary 2006
today=(new Date()).toOxfordDate(); // Get today as an OxfordDate
oxDate2=new OxfordDate(today.Term,5,6);// Saturday 5th week of this current term
*/

function OxfordDate(term,week,day) {
this.Term=term;
this.Week=week;
this.Day=day;
this.toString=OxfordDateString;
this.toRealDate=new Function("return OxfordToReal(this);");
}

function OxfordToReal(oxfordDate) {
var d=oxfordDate.Term.StartDate;
var x=d.getTime()+(oxfordDate.Week*7+oxfordDate.Day)*(24*3600*1000);
d=new Date(x);
// Return a date at midnight local time, not UTC
var dLocal=new Date(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate());
return dLocal;
}

function OxfordDateString() {
return weekdays[this.Day]+" Week "+this.Week+", "+this.Term.TermName+" "+this.Term.StartDate.getFullYear();
}

function RealToOxford(date) {
var realDate=date;

if (date.getTimezoneOffset()!=0) {
realDate=new Date(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate()));
}

var term=new Term(realDate);
var diff=Math.floor((realDate-term.StartDate)/(24*3600*1000));// difference in days
var week=Math.floor(diff/7);
var day=realDate.getDay();
return new OxfordDate(term,week,day);
}

Date.prototype.toOxfordDate=new Function("return RealToOxford(this);");
